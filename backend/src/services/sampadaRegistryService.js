/**
 * Sampada Canonical Registry Service
 * Single authoritative source of truth for candidate_id and enrolment verification.
 * Under BHIV vNEXT P0 Directive:
 * - Candidate IDs must NEVER be generated independently or accepted from client input.
 * - Only verified records in the Sampada registry are authorized for candidate applications.
 */

const APPROVED_INSTITUTES = ["MSSU", "DYP-A", "SIT-S", "SIPS-S", "VJTI"];

// Canonical Sampada in-memory verified enrolment registry (synced from Sampada)
const verifiedRegistry = new Map();

// Seed initial verified synthetic test candidates across all 5 institutes for Gate 2/Gate 4 verification
const initialSeeds = [
  {
    candidate_id: "BHIV-2026-MSSU-0085",
    email: "candidate.mssu@test.bhiv.com",
    institute_code: "MSSU",
    campus: "KHARGHAR",
    cohort_id: "COHORT-2026-OCT-A",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-DYPA-0001",
    email: "candidate.dypa@test.bhiv.com",
    institute_code: "DYP-A",
    campus: "MAIN",
    cohort_id: "COHORT-2026-OCT-A",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-SITS-0001",
    email: "candidate.sits@test.bhiv.com",
    institute_code: "SIT-S",
    campus: "MAIN",
    cohort_id: "COHORT-2026-OCT-B",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-SIPSS-0001",
    email: "candidate.sipss@test.bhiv.com",
    institute_code: "SIPS-S",
    campus: "MAIN",
    cohort_id: "COHORT-2026-OCT-B",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-VJTI-0001",
    email: "candidate.vjti@test.bhiv.com",
    institute_code: "VJTI",
    campus: "MAIN",
    cohort_id: "COHORT-2026-OCT-C",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-MSSU-0001",
    email: "blackholeinfiverse90@gmail.com",
    institute_code: "MSSU",
    campus: "KHARGHAR",
    cohort_id: "COHORT-2026-OCT-A",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  }
];

initialSeeds.forEach((item) => {
  verifiedRegistry.set(item.email.toLowerCase(), item);
});

/**
 * Resolves canonical candidate record from Sampada.
 * In production: queries Sampada API or verified registry.
 * Rejects any caller-supplied candidate claims.
 */
async function resolveCanonicalCandidate(email) {
  if (!email) return null;
  const normalizedEmail = email.trim().toLowerCase();

  const sampadaApiUrl = process.env.SAMPADA_API_URL || "http://localhost:8000";
  if (sampadaApiUrl) {
    try {
      const authHeader = process.env.INTERNAL_SERVICE_KEY || process.env.SAMPADA_API_KEY || "team2_smoke_gw_key";
      const res = await fetch(`${sampadaApiUrl}/api/v1/identity/candidate/${encodeURIComponent(normalizedEmail)}`, {
        headers: { "Authorization": `Bearer ${authHeader}`, "X-API-Key": authHeader }
      });
      if (res.ok) {
        const data = await res.json();
        const cand = data.record || data.candidate;
        if (cand && (cand.canonical_candidate_id || cand.candidate_id)) {
          const normInst = cand.institute_code === "RTMSSU" ? "MSSU" : cand.institute_code;
          const campus = cand.campus || (normInst === "MSSU" ? "KHARGHAR" : "MAIN");
          return {
            candidate_id: cand.canonical_candidate_id || cand.candidate_id,
            email: cand.email || normalizedEmail,
            institute_code: normInst,
            campus: campus,
            cohort_id: cand.cohort_id || "COHORT-2026-OCT-A",
            lifecycle_status: cand.lifecycle_status || "ENROLLED_ACTIVE",
            allowedApps: ["gurukul", "sampada", "hackaverse", "niyantran"]
          };
        }
      }
    } catch (err) {
      // Sampada API query error
    }
  }

  // 2. Query live Abhiruchi students registry (automated candidate intake sync)
  const abhiruchiApiUrl = process.env.ABHIRUCHI_API_URL || "https://abhiruchi.blackholeinfiverse.com/api";
  if (abhiruchiApiUrl) {
    try {
      const res = await fetch(`${abhiruchiApiUrl}/students`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.students || data.data || []);
        const matched = list.find((s) => (s.email || "").trim().toLowerCase() === normalizedEmail);
        if (matched && (matched.candidate_id || matched.student_id)) {
          const cid = matched.candidate_id || matched.student_id;
          const inst = matched.institute_code || (cid.split("-")[2]) || "MSSU";
          const campus = inst === "MSSU" ? "KHARGHAR" : "MAIN";
          const record = {
            candidate_id: cid,
            email: matched.email || normalizedEmail,
            institute_code: inst,
            campus: campus,
            cohort_id: "COHORT-2026-OCT-A",
            lifecycle_status: "ENROLLED_ACTIVE",
            allowedApps: ["gurukul", "sampada", "hackaverse", "niyantran"]
          };
          verifiedRegistry.set(normalizedEmail, record);
          return record;
        }
      }
    } catch (err) {
      // Abhiruchi offline or timeout — fall through safely
    }
  }

  // 3. Fallback to verified canonical registry
  const match = verifiedRegistry.get(normalizedEmail);
  if (match) {
    return { ...match };
  }

  return null;
}

/**
 * Registers or updates a verified candidate in the canonical registry cache.
 */
function registerVerifiedCandidate(candidate) {
  if (!candidate || !candidate.email || !candidate.candidate_id) {
    throw new Error("Invalid candidate record: email and candidate_id are required.");
  }
  verifiedRegistry.set(candidate.email.trim().toLowerCase(), candidate);
}

module.exports = {
  resolveCanonicalCandidate,
  registerVerifiedCandidate,
  APPROVED_INSTITUTES
};
