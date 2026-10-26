# BHIV vNEXT — Pravesh ↔ Gurukul SSO & Canonical Identity Contract

- **Contract Version:** `1.0.0`
- **Release Gate:** Gate 2 (Contract Agreement) & Gate 4 (Cross-Platform Integration)
- **Integration Lead:** Rudra
- **Identity & Contract Validation:** Sanskar
- **Auth Implementation:** Aman Pal (`blackhole_auth`)
- **Gurukul Implementation Lead:** Ranjit (`gurukul-assesment`)

---

## 1. Executive Summary

This document defines the production SSO session contract between **Pravesh** (`pravesh.blackholeinfiverse.com`) and **Gurukul** (`gurukul.blackholeinfiverse.com`).

Per the BHIV vNEXT P0 Directive:
1. **No Parallel Identity Store:** Gurukul must deprecate Clerk (`@clerk/clerk-react`) and rely exclusively on Pravesh Single Auth.
2. **Canonical Candidate Identity:** All learning progress, quizzes, and course completions in Gurukul must be anchored to the immutable `candidate_id` issued by Sampada.
3. **Approved Institutes Only:** Strict allowlist: `MSSU` (canonical for `RTMSSU`), `DYP-A`, `SIT-S`, `SIPS-S`, `VJTI`.

---

## 2. SSO Protocol & Session Verification

### A. Root-Domain Cookie Specification
* **Cookie Name:** `blackhole_token`
* **Domain:** `.blackholeinfiverse.com` (available across all BHIV subdomains)
* **Attributes:** `HttpOnly; Secure; SameSite=Lax; Path=/`

### B. SSO Verification Endpoint
Gurukul frontend or backend verifies the candidate session via:
```http
GET https://pravesh.blackholeinfiverse.com/api/auth/sso/session?app=gurukul
Cookie: blackhole_token=<JWT_TOKEN>
```

#### Success Response (`200 OK`):
```json
{
  "authenticated": true,
  "user": {
    "user_id": "usr_73616d706c",
    "candidate_id": "BHIV-2026-MSSU-0085",
    "email": "candidate.mssu@student.edu",
    "email_verified": true,
    "institute_code": "MSSU",
    "cohort_id": "COHORT-2026-OCT-A",
    "tenant_id": "tenant_default",
    "roles": ["candidate"],
    "permissions": ["learning:read", "assessments:take", "tasks:read"],
    "allowedApps": ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"],
    "lifecycle_status": "ENROLLED_ACTIVE"
  }
}
```

#### Access Denied Responses:
* **401 Unauthorized:** Missing or invalid `blackhole_token`.  
  *Action:* Redirect to `https://pravesh.blackholeinfiverse.com/login?redirect=https://gurukul.blackholeinfiverse.com`
* **403 Forbidden (`app` not allowed):** Candidate is authenticated but `"gurukul"` is not in `allowedApps`.  
  *Action:* Render *"403: Candidate is not enrolled for Gurukul learning access."*
* **403 Forbidden (`lifecycle_status` revoked):** Candidate status is `SUSPENDED`, `WITHDRAWN`, or `INACTIVE`.  
  *Action:* Render *"403: Account suspended or withdrawn. Contact your coordinator."*

---

## 3. Gurukul Implementation Guide

### A. Backend Express Middleware
A drop-in adapter has been implemented in `blackhole_auth` under `backend/src/integrations/gurukulAuthAdapter.js`:

```javascript
const cookieParser = require("cookie-parser");
const { createGurukulAuthMiddleware } = require("./integrations/gurukulAuthAdapter");

app.use(cookieParser());

const requireGurukulAuth = createGurukulAuthMiddleware({
  authServerUrl: process.env.PRAVESH_URL || "https://pravesh.blackholeinfiverse.com",
  jwtSecret: process.env.JWT_SECRET // Optional for direct local verification
});

// Protect assessment routes
app.get("/api/assessments", requireGurukulAuth, (req, res) => {
  // req.user contains canonical candidate_id!
  const candidateId = req.user.candidate_id;
  const institute = req.user.institute_code;
  res.json({ candidateId, institute, message: "Welcome to Gurukul" });
});
```

### B. React Frontend Integration (Replacing Clerk)
In Gurukul frontend, replace `ClerkProvider` and `useUser()` with the Pravesh Auth Context:

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const PraveshAuthContext = createContext(null);

export function PraveshAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pravesh.blackholeinfiverse.com/api/auth/sso/session?app=gurukul", {
      credentials: "include"
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.authenticated ? data.user : null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PraveshAuthContext.Provider value={{ user, candidateId: user?.candidate_id, loading }}>
      {children}
    </PraveshAuthContext.Provider>
  );
}

export const usePraveshAuth = () => useContext(PraveshAuthContext);
```

---

## 4. Reporting Learning Progress Back (Gurukul → Niyantran/Sampada)

When candidates complete learning modules or quizzes, Gurukul must emit progress events containing:

```json
{
  "event_id": "evt_grk_0091827",
  "candidate_id": "BHIV-2026-MSSU-0085",
  "institute_code": "MSSU",
  "module_id": "AI-FOUNDATIONS-101",
  "score": 94.0,
  "status": "COMPLETED",
  "occurred_at": "2026-10-26T15:30:00.000Z",
  "source_system": "gurukul",
  "schema_version": "1.0.0"
}
```
