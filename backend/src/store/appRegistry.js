/**
 * Product registry — the single place a product is declared.
 *
 * Adding a product means adding one entry to backend/data/apps.json; the
 * launcher, the SSO session check and the allow-list issued with every token
 * all read this file, so no product list is duplicated in code.
 *
 * An entry may carry `devUrl`, used instead of `url` whenever NODE_ENV is not
 * "production" (local frontends run on their own ports).
 */
const fs = require("fs");
const path = require("path");

const APPS_FILE = process.env.APPS_FILE || path.join(__dirname, "..", "..", "data", "apps.json");

function listApps() {
  let entries = [];
  try {
    const parsed = JSON.parse(fs.readFileSync(APPS_FILE, "utf8"));
    entries = Array.isArray(parsed?.apps) ? parsed.apps : Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`[apps] Could not read ${APPS_FILE}: ${err.message}`);
    return [];
  }

  const isProd = (process.env.NODE_ENV || "development") === "production";
  return entries
    .filter((app) => app && app.key && app.url)
    .map((app) => ({
      key: String(app.key).toLowerCase(),
      name: app.name || app.key,
      description: app.description || "",
      url: !isProd && app.devUrl ? app.devUrl : app.url
    }));
}

const appKeys = () => listApps().map((app) => app.key);

const isKnownApp = (key) =>
  Boolean(key) && appKeys().includes(String(key).toLowerCase());

module.exports = { APPS_FILE, listApps, appKeys, isKnownApp };
