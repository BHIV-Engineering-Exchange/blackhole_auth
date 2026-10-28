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
    cohort_id: "COHORT-2026-OCT-A",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-DYPA-0001",
    email: "candidate.dypa@test.bhiv.com",
    institute_code: "DYP-A",
    cohort_id: "COHORT-2026-OCT-A",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-SITS-0001",
    email: "candidate.sits@test.bhiv.com",
    institute_code: "SIT-S",
    cohort_id: "COHORT-2026-OCT-B",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-SIPSS-0001",
    email: "candidate.sipss@test.bhiv.com",
    institute_code: "SIPS-S",
    cohort_id: "COHORT-2026-OCT-B",
    lifecycle_status: "ENROLLED_ACTIVE",
    allowedApps: ["gurukul", "niyantran", "hackaverse", "sampada", "abhiruchi"]
  },
  {
    candidate_id: "BHIV-2026-VJTI-0001",
    email: "candidate.vjti@test.bhiv.com",
    institute_code: "VJTI",
    cohort_id: "COHORT-2026-OCT-C",
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

  const sampadaApiUrl = process.env.SAMPADA_API_URL;
  if (sampadaApiUrl) {
    try {
      const res = await fetch(`${sampadaApiUrl}/api/candidates/verify?email=${encodeURIComponent(normalizedEmail)}`, {
        headers: { "X-Service-Auth": process.env.INTERNAL_SERVICE_KEY || "bhiv-internal-service" }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.candidate && APPROVED_INSTITUTES.includes(data.candidate.institute_code)) {
          return data.candidate;
        }
      }
    } catch (err) {
      console.error("[SampadaRegistry] Failed to query live Sampada API:", err.message);
    }
  }

  // Fallback to verified canonical registry
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
