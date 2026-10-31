const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { corsOrigins, jwtSecret, authServerUrl, cookieDomain, cookieSecure } = require("./config/env");
const { requireAuth, optionalAuth } = require("./middleware/blackholeAuth");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const { listApps, appKeys, isKnownApp } = require("./store/appRegistry");

const APPROVED_INSTITUTES = ["MSSU", "DYP-A", "SIT-S", "SIPS-S", "VJTI"];

const normalizeInstituteCode = (code) => {
  if (!code) return null;
  const upper = String(code).trim().toUpperCase();
  if (upper === "RTMSSU") return "MSSU";
  return upper;
};

const deriveTenantId = (instituteCode, campus) => {
  if (!instituteCode) return "tenant_default";
  const inst = String(instituteCode).trim().toUpperCase();
  const camp = String(campus || "").trim().toUpperCase();
  if (inst === "MSSU" || inst === "RTMSSU") {
    if (camp === "PUNE") return "tenant_mssu_pune";
    return "tenant_mssu_kharghar";
  }
  if (inst === "DYP-A") return "tenant_dyp_akurdi";
  if (inst === "SIT-S") return "tenant_sit_pune";
  if (inst === "SIPS-S") return "tenant_sips_nashik";
  if (inst === "VJTI") return "tenant_vjti_mumbai";
  return "tenant_default";
};

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

const defaultAllowedOrigins = [
  "https://namankan.blackholeinfiverse.com",
  "https://pravesh.blackholeinfiverse.com",
  "https://products.blackholeinfiverse.com",
  "https://gurukul.blackholeinfiverse.com",
  "https://niyantran.blackholeinfiverse.com",
  "https://hackaverse.blackholeinfiverse.com",
  "https://sampada.blackholeinfiverse.com",
  "https://abhiruchi.blackholeinfiverse.com",
  "https://*.blackholeinfiverse.com",
  "http://163.128.209.18:*",
  "http://localhost:*"
];

const allCorsOrigins = Array.from(new Set([...corsOrigins, ...defaultAllowedOrigins]));

const originAllowed = (origin) => {
  if (!origin) return true;
  return allCorsOrigins.some((allowed) => {
    if (allowed === origin) return true;
    if (allowed.includes("*")) {
      const regexPattern = `^${allowed.replace(/[\^$.+?()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`;
      return new RegExp(regexPattern).test(origin);
    }
    return false;
  });
};

app.use(
  cors({
    origin(origin, callback) {
      if (originAllowed(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true
  })
);

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300
  })
);

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

app.use(optionalAuth({ jwtSecret }));

// COOKIE_DOMAIN (e.g. .blackholeinfiverse.com) lets the same cookie reach
// product subdomains in production; locally it stays host-only on localhost,
// which already covers every port.
const cookieOptions = () => ({
  httpOnly: true,
  secure: cookieSecure,
  sameSite: "lax",
  path: "/",
  ...(cookieDomain ? { domain: cookieDomain } : {})
});

app.get(["/api/health", "/health"], (req, res) => res.status(200).json({ status: "ok" }));

// Product registry, served from backend/data/apps.json so the launcher never
// carries its own copy of the product list.
app.get(["/api/apps", "/api/auth/apps"], (req, res) => {
  return res.json({ success: true, apps: listApps() });
});

// Official Frozen SSO & Candidate Contract Schema for Gate 2
app.get(["/api/auth/contract", "/api/contract"], (req, res) => {
  res.status(200).json({
    contract_version: "1.0.0",
    service: "Pravesh Single Auth & Application Access",
    approved_institute_codes: APPROVED_INSTITUTES,
    approved_campuses: ["KHARGHAR", "PUNE", "MAIN"],
    cookie: {
      name: "blackhole_token",
      domain: cookieDomain || ".blackholeinfiverse.com",
      httpOnly: true,
      secure: cookieSecure,
      sameSite: "lax",
      path: "/"
    },
    required_jwt_claims: [
      "user_id",
      "candidate_id",
      "email",
      "email_verified",
      "institute_code",
      "campus",
      "cohort_id",
      "tenant_id",
      "roles",
      "allowedApps",
      "lifecycle_status"
    ],
    sso_verification_endpoint: "GET /api/auth/sso/session?app=<appSlug>",
    allowed_apps: [
      "abhiruchi",
      "sampada",
      "hackaverse",
      "niyantran",
      "gurukul",
      "setu",
      "mitra",
      "vajra",
      "gov-ops",
      "district-intelligence"
    ]
  });
});

const { resolveCanonicalCandidate, registerVerifiedCandidate } = require("./services/sampadaRegistryService");

app.post(["/api/login", "/api/auth/login", "/login", "/auth/login"], async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const ALL_ADMIN_APPS = [
    "setu",
    "sampada",
    "niyantran",
    "gurukul",
    "mitra",
    "vajra",
    "gov-ops",
    "gov_ops",
    "district-intelligence",
    "district_intelligence",
    "intelligence",
    "abhiruchi",
    "hackaverse"
  ];

  const ADMIN_EMAILS = [
    "admin@blackholeinfiverse.com",
    "admin@gurukul.com",
    "admin@gurukul",
    "admin@sampada.com",
    "admin@niyantran.com",
    "admin@hackaverse.com"
  ];

  const isProduction = process.env.NODE_ENV === "production";

  const isAdminEmail = (e) => {
    if (!e) return false;
    const lower = e.trim().toLowerCase();
    // Any email starting with 'admin@' (e.g. admin@gurukul.com, admin@gurukul) gets administrator access
    if (lower.startsWith("admin@")) return true;
    if (ADMIN_EMAILS.includes(lower)) return true;
    if (lower.endsWith("@blackholeinfiverse.com")) return true;
    const envAdmins = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    return envAdmins.includes(lower);
  };

  // Check if logging in as authorized administrator
  const isAdmin = isAdminEmail(email);

  // Authoritative Trust Boundary: Resolve candidate identity strictly against Sampada registry
  const canonicalRecord = await resolveCanonicalCandidate(email);

  let user;

  const DEFAULT_USER_APPS = [
    "sampada",
    "hackaverse",
    "gurukul",
    
    "mitra",
    "niyantran"
  ];

  if (isAdmin) {
    const adminInst = canonicalRecord ? canonicalRecord.institute_code : null;
    const adminCampus = canonicalRecord ? canonicalRecord.campus : null;
    // Authorized Administrator: grant full platform and app launcher access
    user = {
      user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
      candidate_id: canonicalRecord ? canonicalRecord.candidate_id : null,
      email,
      email_verified: true,
      institute_code: adminInst,
      campus: adminCampus || (adminInst === "MSSU" ? "KHARGHAR" : "MAIN"),
      cohort_id: canonicalRecord ? canonicalRecord.cohort_id : null,
      tenant_id: deriveTenantId(adminInst, adminCampus),
      roles: ["admin"],
      permissions: [
        "all",
        "admin",
        "read",
        "write",
        "intelligence:view",
        "intelligence:read",
        "intelligence:write",
        "intelligence:admin",
        "intelligence:*"
      ],
      allowedApps: ALL_ADMIN_APPS,
      lifecycle_status: "ACTIVE"
    };
  } else if (isProduction) {
    // In production, caller-supplied candidate_id, roles, and allowedApps are STRICTLY IGNORED!
    if (canonicalRecord) {
      const inst = canonicalRecord.institute_code;
      const campus = canonicalRecord.campus || (inst === "MSSU" ? "KHARGHAR" : "MAIN");
      user = {
        user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: canonicalRecord.candidate_id,
        email,
        email_verified: true,
        institute_code: inst,
        campus: campus,
        cohort_id: canonicalRecord.cohort_id || null,
        tenant_id: deriveTenantId(inst, campus),
        roles: ["candidate"],
        permissions: ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: canonicalRecord.allowedApps || DEFAULT_USER_APPS,
        lifecycle_status: canonicalRecord.lifecycle_status || "ENROLLED_ACTIVE"
      };
    } else {
      // General user / candidate awaiting registry sync — granted standard user applications
      user = {
        user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: null,
        email,
        email_verified: true,
        institute_code: null,
        campus: null,
        cohort_id: null,
        tenant_id: "tenant_default",
        roles: ["user"],
        permissions: ["general:read"],
        allowedApps: [],
        lifecycle_status: "UNENROLLED"
      };
    }
  } else {
    // Non-production / Test Harness Mode
    if (canonicalRecord) {
      const inst = canonicalRecord.institute_code;
      const campus = canonicalRecord.campus || (inst === "MSSU" ? "KHARGHAR" : "MAIN");
      user = {
        user_id: req.body.user_id || `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: canonicalRecord.candidate_id,
        email,
        email_verified: true,
        institute_code: inst,
        campus: campus,
        cohort_id: canonicalRecord.cohort_id || null,
        tenant_id: deriveTenantId(inst, campus),
        roles: ["candidate"],
        permissions: ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: canonicalRecord.allowedApps || DEFAULT_USER_APPS,
        lifecycle_status: canonicalRecord.lifecycle_status || "ENROLLED_ACTIVE"
      };
    } else {
      // Allow synthetic test overrides in development only if institute_code is provided and valid
      let normInstitute = null;
      if (req.body.institute_code) {
        normInstitute = normalizeInstituteCode(req.body.institute_code);
        if (!APPROVED_INSTITUTES.includes(normInstitute)) {
          return res.status(400).json({
            error: `Invalid institute_code '${req.body.institute_code}'. Allowed: ${APPROVED_INSTITUTES.join(", ")}`,
            allowed_codes: APPROVED_INSTITUTES
          });
        }
      }

      const defaultCandidateApps = [
        "sampada",
        "hackaverse",
        "gurukul",
        "mitra",
        "niyantran"
      ];

      const campus = req.body.campus || (normInstitute === "MSSU" ? "KHARGHAR" : "MAIN");

      user = {
        user_id: req.body.user_id || `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: req.body.candidate_id || (normInstitute ? `BHIV-2026-${normInstitute}-001` : null),
        email,
        email_verified: req.body.email_verified ?? true,
        institute_code: normInstitute,
        campus: campus,
        cohort_id: req.body.cohort_id || null,
        tenant_id: deriveTenantId(normInstitute, campus),
        roles: req.body.roles || ["candidate"],
        permissions: req.body.permissions || ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: req.body.allowedApps || defaultCandidateApps,
        lifecycle_status: req.body.lifecycle_status || "ENROLLED_ACTIVE"
      };
    }
  }

  const token = jwt.sign(user, jwtSecret, { expiresIn: "8h" });

  const cookieOpts = {
    httpOnly: true,
    secure: cookieSecure,
    sameSite: "lax",
    path: "/"
  };
  if (cookieDomain) {
    cookieOpts.domain = cookieDomain;
  }

  res.cookie("blackhole_token", token, cookieOpts);

  return res.json({ success: true, user });
});

app.post(["/api/auth/logout", "/api/logout", "/logout", "/auth/logout"], (req, res) => {
  const clearOpts = { path: "/" };
  if (cookieDomain) clearOpts.domain = cookieDomain;
  res.clearCookie("blackhole_token", clearOpts);
  return res.json({ success: true });
});

// Guest (demo) session: issued to anyone who opens a product without signing
// in. Guests get read-only access; products reject their mutations with
// 403 signin_required and prompt for sign-in only when an action needs it.
const guestIdentity = () => ({
  user_id: `guest_${crypto.randomBytes(6).toString("hex")}`,
  email: null,
  tenant_id: "tenant_default",
  roles: [],
  permissions: [],
  allowedApps: appKeys(),
  isGuest: true
});

const issueGuestSession = (res, existingClaims = null) => {
  const claims = existingClaims || guestIdentity();
  const token = jwt.sign(claims, jwtSecret, { expiresIn: "24h" });
  res.cookie("blackhole_token", token, cookieOptions());
  return claims;
};

app.get(
  ["/api/me", "/api/auth/me", "/me", "/auth/me"],
  requireAuth({ jwtSecret, authServerUrl, allowGuest: true }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

// Products call this before their own session check. No cookie yet, or only a
// guest cookie? Mint/refresh a guest session so the product boots straight
// into its read-only view instead of a sign-in page. A real session passes
// through untouched.
app.get(
  ["/api/sso/guest", "/api/auth/sso/guest", "/auth/sso/guest", "/sso/guest"],
  (req, res) => {
    if (req.user && !req.user.isGuest) {
      return res.json({ success: true, guest: false, user: req.user });
    }
    const claims = issueGuestSession(res, req.user || null);
    return res.json({
      success: true,
      guest: true,
      user: {
        user_id: claims.user_id,
        email: null,
        tenant_id: claims.tenant_id,
        roles: [],
        permissions: [],
        allowedApps: claims.allowedApps,
        isGuest: true
      }
    });
  }
);

app.get(["/api/auth/sso/session", "/api/sso/session", "/auth/sso/session", "/sso/session"], (req, res) => {
  const targetApp = req.query.app;
  if (targetApp && !isKnownApp(targetApp)) {
    return res.status(403).json({ authenticated: false, error: "Access denied to requested application" });
  }

  // strict=1 keeps the old contract (401 when not signed in) for products
  // that genuinely require a real account on entry.
  if (!req.user && req.query.strict === "1") {
    return res.status(401).json({ authenticated: false, error: "Not authenticated" });
  }

  // No real session, or only a guest one: mint/refresh a guest cookie so the
  // product boots straight into its read-only view instead of a sign-in page.
  if (!req.user || req.user.isGuest) {
    const claims = issueGuestSession(res, req.user || null);
    return res.json({
      authenticated: true,
      guest: true,
      user: req.user || {
        user_id: claims.user_id,
        email: null,
        tenant_id: claims.tenant_id,
        roles: [],
        permissions: [],
        allowedApps: claims.allowedApps,
        isGuest: true
      }
    });
  }

  const isCandidate = Array.isArray(req.user.roles) && req.user.roles.includes("candidate");

  // Trust boundary: Candidate sessions require verified institute and active lifecycle status
  if (isCandidate) {
    if (!req.user.institute_code || !APPROVED_INSTITUTES.includes(req.user.institute_code)) {
      return res.status(403).json({
        authenticated: true,
        error: `Access denied: Candidate has no valid approved institute_code assigned (Allowed: ${APPROVED_INSTITUTES.join(", ")})`,
        institute_code: req.user.institute_code || null
      });
    }

    const validActiveStatuses = ["ENROLLED_ACTIVE", "ACTIVE"];
    const currentStatus = (req.user.lifecycle_status || "").toUpperCase();
    if (!validActiveStatuses.includes(currentStatus)) {
      return res.status(403).json({
        authenticated: true,
        error: `Access denied: Candidate lifecycle status '${req.user.lifecycle_status}' does not allow application access`,
        lifecycle_status: req.user.lifecycle_status
      });
    }

    if (!req.user.candidate_id) {
      return res.status(403).json({
        authenticated: true,
        error: "Access denied: Missing canonical candidate_id from Sampada registry",
        candidate_id: null
      });
    }
  }

  if (
    targetApp &&
    Array.isArray(req.user.allowedApps) &&
    !req.user.allowedApps.some((a) => a.toLowerCase() === targetApp.toLowerCase())
  ) {
    return res.status(403).json({
      authenticated: true,
      error: `Access denied to requested application: ${targetApp}`,
      app: targetApp
    });
  }

  // Revoke access if lifecycle status is inactive/suspended
  const revokedStatuses = ["SUSPENDED", "WITHDRAWN", "INACTIVE"];
  if (req.user.lifecycle_status && revokedStatuses.includes(req.user.lifecycle_status.toUpperCase())) {
    return res.status(403).json({
      authenticated: true,
      error: `Access revoked due to candidate lifecycle status: ${req.user.lifecycle_status}`,
      lifecycle_status: req.user.lifecycle_status
    });
  }

  return res.json({ authenticated: true, guest: false, user: req.user });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
