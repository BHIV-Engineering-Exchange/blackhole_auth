const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { corsOrigins, jwtSecret, authServerUrl, cookieDomain, cookieSecure } = require("./config/env");
const { requireAuth, optionalAuth } = require("./middleware/blackholeAuth");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const APPROVED_INSTITUTES = ["MSSU", "DYP-A", "SIT-S", "SIPS-S", "VJTI"];

const normalizeInstituteCode = (code) => {
  if (!code) return null;
  const upper = String(code).trim().toUpperCase();
  if (upper === "RTMSSU") return "MSSU";
  return upper;
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

app.use(optionalAuth({ jwtSecret }));

app.get(["/api/health", "/health"], (req, res) => res.status(200).json({ status: "ok" }));

// Official Frozen SSO & Candidate Contract Schema for Gate 2
app.get(["/api/auth/contract", "/api/contract"], (req, res) => {
  res.status(200).json({
    contract_version: "1.0.0",
    service: "Pravesh Single Auth & Application Access",
    approved_institute_codes: APPROVED_INSTITUTES,
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
      "cohort_id",
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
    "blackholeinfiverse90@gmail.com",
    "admin@gurukul.com",
    "admin@blackholeinfiverse.com"
  ];

  const isAdminEmail = (e) => {
    if (!e) return false;
    const lower = e.trim().toLowerCase();
    if (ADMIN_EMAILS.includes(lower)) return true;
    if (lower.endsWith("@blackholeinfiverse.com")) return true;
    const envAdmins = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    return envAdmins.includes(lower);
  };

  const isProduction = process.env.NODE_ENV === "production";

  // Check if logging in as authorized administrator
  const isAdmin = isAdminEmail(email);

  // Authoritative Trust Boundary: Resolve candidate identity strictly against Sampada registry
  const canonicalRecord = await resolveCanonicalCandidate(email);

  let user;

  if (isAdmin) {
    // Authorized Administrator: grant full platform and app launcher access
    user = {
      user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
      candidate_id: canonicalRecord ? canonicalRecord.candidate_id : null,
      email,
      email_verified: true,
      institute_code: canonicalRecord ? canonicalRecord.institute_code : null,
      cohort_id: canonicalRecord ? canonicalRecord.cohort_id : null,
      tenant_id: "tenant_default",
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
      user = {
        user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: canonicalRecord.candidate_id,
        email,
        email_verified: true,
        institute_code: canonicalRecord.institute_code,
        cohort_id: canonicalRecord.cohort_id || null,
        tenant_id: "tenant_default",
        roles: ["candidate"],
        permissions: ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: canonicalRecord.allowedApps || [
          "abhiruchi",
          "sampada",
          "hackaverse",
          "niyantran",
          "gurukul"
        ],
        lifecycle_status: canonicalRecord.lifecycle_status || "ENROLLED_ACTIVE"
      };
    } else {
      // Unenrolled or general user - NEVER grant candidate_id or candidate apps from client input
      user = {
        user_id: `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: null,
        email,
        email_verified: true,
        institute_code: null,
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
      user = {
        user_id: req.body.user_id || `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: canonicalRecord.candidate_id,
        email,
        email_verified: true,
        institute_code: canonicalRecord.institute_code,
        cohort_id: canonicalRecord.cohort_id || null,
        tenant_id: "tenant_default",
        roles: ["candidate"],
        permissions: ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: canonicalRecord.allowedApps || [
          "abhiruchi",
          "sampada",
          "hackaverse",
          "niyantran",
          "gurukul"
        ],
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

      user = {
        user_id: req.body.user_id || `usr_${Buffer.from(email).toString("hex").slice(0, 10)}`,
        candidate_id: req.body.candidate_id || (normInstitute ? `BHIV-2026-${normInstitute}-001` : null),
        email,
        email_verified: req.body.email_verified ?? true,
        institute_code: normInstitute,
        cohort_id: req.body.cohort_id || null,
        tenant_id: req.body.tenant_id || "tenant_default",
        roles: req.body.roles || (normInstitute ? ["candidate"] : ["user"]),
        permissions: req.body.permissions || ["learning:read", "assessments:take", "tasks:read", "tasks:submit"],
        allowedApps: req.body.allowedApps || (normInstitute ? [
          "abhiruchi",
          "sampada",
          "hackaverse",
          "niyantran",
          "gurukul",
          "setu",
          "mitra",
          "vajra"
        ] : []),
        lifecycle_status: req.body.lifecycle_status || (normInstitute ? "ENROLLED_ACTIVE" : "UNENROLLED")
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

app.get(
  ["/api/me", "/api/auth/me", "/me", "/auth/me"],
  requireAuth({ jwtSecret, authServerUrl }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

app.get(["/api/auth/sso/session", "/api/sso/session", "/auth/sso/session", "/sso/session"], (req, res) => {
  if (!req.user) {
    return res.status(401).json({ authenticated: false, error: "Not authenticated" });
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

  const targetApp = req.query.app;
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

  return res.json({ authenticated: true, user: req.user });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
