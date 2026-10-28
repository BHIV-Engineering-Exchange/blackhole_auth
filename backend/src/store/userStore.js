/**
 * Account store for the Blackhole identity server (email-only sign-in).
 *
 * A Blackhole ID (email) is the whole credential: the first time an address
 * signs in its account is created, and every later sign-in resolves to that
 * same account — identity, role and product access all come from the record,
 * so nothing about a user is baked into the code and every new account works
 * identically.
 *
 * NOTE: there is no password check by design (requested behaviour). Treat the
 * launcher as an intranet/SSO front door: anyone who knows an address can act
 * as it. Restoring password verification means re-adding a hash check here and
 * a password field on the login page.
 *
 * Records live in a JSON file (override with USERS_FILE). The exported API is
 * the only thing callers depend on, so swapping to a database later is local.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const USERS_FILE =
  process.env.USERS_FILE || path.join(__dirname, "..", "..", "data", "users.json");

// Product access is registry-driven (see appRegistry.js); accounts only carry
// the role they authenticate with.
const DEFAULT_ROLES = ["user"];
const DEFAULT_PERMISSIONS = ["apps:read", "apps:launch"];
const ADMIN_PERMISSIONS = ["apps:read", "apps:launch", "admin"];

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

function readStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
    if (Array.isArray(parsed?.users)) return parsed;
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`[accounts] Could not read ${USERS_FILE}: ${err.message}`);
    }
  }
  return { users: [] };
}

function writeStore(store) {
  const dir = path.dirname(USERS_FILE);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${USERS_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  fs.renameSync(tmp, USERS_FILE);
}

function findByEmail(email) {
  const normalized = normalizeEmail(email);
  return readStore().users.find((user) => user.email === normalized) || null;
}

/**
 * Resolve a Blackhole ID to its account, creating it on first sign-in.
 * The first account ever created on a fresh store becomes the admin.
 * Returns { ok, user } or { ok:false, status, error }.
 */
function ensureAccount({ email }) {
  const normalized = normalizeEmail(email);
  if (!normalized) {
    return { ok: false, status: 400, error: "Email is required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { ok: false, status: 400, error: "Enter a valid Blackhole ID (email)" };
  }

  const existing = findByEmail(normalized);
  if (existing) return { ok: true, user: existing, created: false };

  const store = readStore();
  const isAdmin = store.users.length === 0;
  const account = {
    user_id: `usr_${crypto.randomBytes(6).toString("hex")}`,
    email: normalized,
    tenant_id: "tenant_default",
    roles: isAdmin ? ["admin"] : DEFAULT_ROLES,
    permissions: isAdmin ? ADMIN_PERMISSIONS : DEFAULT_PERMISSIONS,
    created_at: new Date().toISOString()
  };

  store.users.push(account);
  writeStore(store);
  return { ok: true, user: account, created: true };
}

module.exports = {
  USERS_FILE,
  ensureAccount,
  findByEmail,
  normalizeEmail
};
