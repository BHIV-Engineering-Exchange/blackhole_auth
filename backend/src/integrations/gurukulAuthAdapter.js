/**
 * Gurukul Pravesh Auth Adapter
 * Reusable integration middleware & helper for Team 3 (Gurukul).
 * Provides seamless Pravesh SSO authentication and extracts the canonical candidate_id.
 */

const jwt = require("jsonwebtoken");

const DEFAULT_AUTH_SERVER_URL = "https://pravesh.blackholeinfiverse.com";
const DEFAULT_COOKIE_NAME = "blackhole_token";
const APPROVED_INSTITUTES = ["MSSU", "DYP-A", "SIT-S", "SIPS-S", "VJTI"];

/**
 * Express Middleware for Gurukul backend routes.
 * Validates Pravesh SSO cookie and extracts candidate context.
 */
function createGurukulAuthMiddleware(options = {}) {
  const jwtSecret = options.jwtSecret || process.env.JWT_SECRET;
  const cookieName = options.cookieName || DEFAULT_COOKIE_NAME;
  const authServerUrl = options.authServerUrl || process.env.AUTH_SERVER_URL || DEFAULT_AUTH_SERVER_URL;

  return async (req, res, next) => {
    const token = req.cookies?.[cookieName];

    if (!token) {
      if (req.accepts("json") === "json") {
        return res.status(401).json({
          authenticated: false,
          error: "Not authenticated. Please log in via Pravesh.",
          login_url: `${authServerUrl}/login?redirect=${encodeURIComponent(req.originalUrl || "/")}`
        });
      }
      return res.redirect(`${authServerUrl}/login?redirect=${encodeURIComponent(req.originalUrl || "/")}`);
    }

    try {
      let decoded = null;
      if (jwtSecret) {
        decoded = jwt.verify(token, jwtSecret);
      } else {
        // Fallback: verify via Pravesh SSO session endpoint if secret is not shared locally
        const response = await fetch(`${authServerUrl}/api/auth/sso/session?app=gurukul`, {
          headers: { Cookie: `${cookieName}=${token}` }
        });
        if (!response.ok) {
          return res.status(401).json({ authenticated: false, error: "Invalid Pravesh session" });
        }
        const sessionData = await response.json();
        decoded = sessionData.user;
      }

      // Check application permission
      const allowedApps = (decoded.allowedApps || []).map((a) => a.toLowerCase());
      if (!allowedApps.includes("gurukul")) {
        return res.status(403).json({
          authenticated: true,
          error: "Access denied: Candidate is not enrolled for Gurukul learning access.",
          app: "gurukul"
        });
      }

      // Check lifecycle status
      const revoked = ["SUSPENDED", "WITHDRAWN", "INACTIVE"];
      if (decoded.lifecycle_status && revoked.includes(decoded.lifecycle_status.toUpperCase())) {
        return res.status(403).json({
          authenticated: true,
          error: `Candidate lifecycle status (${decoded.lifecycle_status}) does not permit assessment/course access.`
        });
      }

      // Validate institute code
      if (decoded.institute_code && !APPROVED_INSTITUTES.includes(decoded.institute_code)) {
        return res.status(403).json({
          authenticated: true,
          error: `Invalid institute code '${decoded.institute_code}'. Allowed: ${APPROVED_INSTITUTES.join(", ")}`
        });
      }

      // Attach standardized canonical candidate context to request
      req.user = {
        user_id: decoded.user_id,
        candidate_id: decoded.candidate_id, // Canonical BHIV candidate ID
        email: decoded.email,
        email_verified: decoded.email_verified,
        institute_code: decoded.institute_code,
        cohort_id: decoded.cohort_id,
        roles: decoded.roles || [],
        lifecycle_status: decoded.lifecycle_status || "ENROLLED_ACTIVE"
      };

      next();
    } catch (err) {
      return res.status(401).json({
        authenticated: false,
        error: "Session verification failed",
        details: err.message
      });
    }
  };
}

/**
 * Client-side helper for Gurukul React/Vite frontend.
 * Can replace ClerkProvider / useUser hooks in Gurukul.
 */
const clientHelper = `
// Gurukul Frontend Helper: src/context/PraveshAuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const PraveshAuthContext = createContext(null);

export function PraveshAuthProvider({ children, authServerUrl = "https://pravesh.blackholeinfiverse.com" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      try {
        const res = await fetch(\`\${authServerUrl}/api/auth/sso/session?app=gurukul\`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    verifySession();
  }, [authServerUrl]);

  const login = () => {
    window.location.href = \`\${authServerUrl}/login?redirect=\${encodeURIComponent(window.location.href)}\`;
  };

  const logout = async () => {
    await fetch(\`\${authServerUrl}/api/auth/logout\`, { method: 'POST', credentials: 'include' });
    setUser(null);
    login();
  };

  return (
    <PraveshAuthContext.Provider value={{ user, candidateId: user?.candidate_id, instituteCode: user?.institute_code, loading, login, logout }}>
      {children}
    </PraveshAuthContext.Provider>
  );
}

export const usePraveshAuth = () => useContext(PraveshAuthContext);
`;

module.exports = {
  createGurukulAuthMiddleware,
  clientHelper,
  APPROVED_INSTITUTES
};
