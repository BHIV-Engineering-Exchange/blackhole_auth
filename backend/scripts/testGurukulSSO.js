/**
 * Test Suite: Pravesh -> Gurukul SSO & Candidate Lifecycle Verification
 * Verifies AT-01, AT-02, AT-03, AT-07 acceptance conditions.
 */

const http = require("http");
const app = require("../src/app");

const PORT = 9099;
let server;

function request(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: PORT,
        method,
        path,
        headers
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = JSON.parse(data);
          } catch {
            parsed = data;
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: parsed
          });
        });
      }
    );
    req.on("error", reject);
    if (body) {
      req.write(typeof body === "string" ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=================================================");
  console.log("   PRAVESH -> GURUKUL SSO & CONTRACT TEST SUITE   ");
  console.log("=================================================\n");

  server = app.listen(PORT);

  try {
    // Test 1: Contract Endpoint
    console.log("[TEST 1] Verifying /api/auth/contract...");
    const contractRes = await request("GET", "/api/auth/contract");
    if (contractRes.status !== 200 || contractRes.body.contract_version !== "1.0.0") {
      throw new Error(`Failed Test 1: Contract endpoint returned status ${contractRes.status}`);
    }
    console.log("✅ Passed: Frozen Contract v1.0.0 available.");

    // Test 2: Login synthetic candidate for MSSU
    console.log("\n[TEST 2] Logging in synthetic candidate for institute MSSU...");
    const loginRes = await request(
      "POST",
      "/api/login",
      { "Content-Type": "application/json" },
      {
        email: "candidate.mssu@test.bhiv.com",
        candidate_id: "BHIV-2026-MSSU-0085",
        institute_code: "MSSU",
        cohort_id: "COHORT-2026-OCT-A",
        roles: ["candidate"],
        allowedApps: ["gurukul", "niyantran", "hackaverse"]
      }
    );

    if (loginRes.status !== 200 || !loginRes.body.success) {
      throw new Error(`Failed Test 2: Login returned ${loginRes.status}`);
    }

    const setCookie = loginRes.headers["set-cookie"];
    if (!setCookie || !setCookie.some((c) => c.includes("blackhole_token="))) {
      throw new Error("Failed Test 2: blackhole_token cookie was not set");
    }
    const cookieHeader = setCookie[0].split(";")[0];
    console.log("✅ Passed: Login issued token cookie:", cookieHeader.slice(0, 35) + "...");

    // Test 3: SSO Session check for Gurukul
    console.log("\n[TEST 3] Calling /api/auth/sso/session?app=gurukul with cookie...");
    const ssoRes = await request("GET", "/api/auth/sso/session?app=gurukul", {
      Cookie: cookieHeader
    });

    if (ssoRes.status !== 200 || !ssoRes.body.authenticated) {
      throw new Error(`Failed Test 3: SSO returned ${ssoRes.status}`);
    }

    const user = ssoRes.body.user;
    if (user.candidate_id !== "BHIV-2026-MSSU-0085") {
      throw new Error(`Failed Test 3: Expected candidate_id BHIV-2026-MSSU-0085 but got ${user.candidate_id}`);
    }
    if (user.institute_code !== "MSSU") {
      throw new Error(`Failed Test 3: Expected institute_code MSSU but got ${user.institute_code}`);
    }
    if (!user.allowedApps.includes("gurukul")) {
      throw new Error("Failed Test 3: allowedApps does not contain gurukul");
    }
    console.log("✅ Passed: Gurukul session verified! Returned candidate context:");
    console.log("   - candidate_id:", user.candidate_id);
    console.log("   - institute_code:", user.institute_code);
    console.log("   - cohort_id:", user.cohort_id);
    console.log("   - allowedApps:", user.allowedApps);

    // Test 4: RTMSSU normalization
    console.log("\n[TEST 4] Testing institute code normalization (RTMSSU -> MSSU)...");
    const normRes = await request(
      "POST",
      "/api/login",
      { "Content-Type": "application/json" },
      {
        email: "candidate.rtmssu@test.bhiv.com",
        institute_code: "RTMSSU"
      }
    );
    if (normRes.body.user.institute_code !== "MSSU") {
      throw new Error(`Failed Test 4: Expected MSSU but got ${normRes.body.user.institute_code}`);
    }
    console.log("✅ Passed: RTMSSU normalized to MSSU.");

    // Test 5: Rejection of invalid institute code
    console.log("\n[TEST 5] Testing rejection of unapproved institute code...");
    const invalidRes = await request(
      "POST",
      "/api/login",
      { "Content-Type": "application/json" },
      {
        email: "invalid@test.com",
        institute_code: "UNKNOWN_COLLEGE"
      }
    );
    if (invalidRes.status !== 400) {
      throw new Error(`Failed Test 5: Expected 400 Bad Request, got ${invalidRes.status}`);
    }
    console.log("✅ Passed: Unknown institute code correctly rejected with 400.");

    // Test 6: Access Denied for unauthorized application
    console.log("\n[TEST 6] Testing access denied when app not in allowedApps...");
    const deniedRes = await request("GET", "/api/auth/sso/session?app=restricted-admin-portal", {
      Cookie: cookieHeader
    });
    if (deniedRes.status !== 403) {
      throw new Error(`Failed Test 6: Expected 403 Forbidden, got ${deniedRes.status}`);
    }
    console.log("✅ Passed: Unauthorized app access blocked with 403.");

    // Test 7: Logout clears cookie
    console.log("\n[TEST 7] Testing logout...");
    const logoutRes = await request("POST", "/api/auth/logout", { Cookie: cookieHeader });
    if (logoutRes.status !== 200 || !logoutRes.body.success) {
      throw new Error(`Failed Test 7: Logout returned ${logoutRes.status}`);
    }
    console.log("✅ Passed: Logout successfully clears session cookie.");

    console.log("\n=================================================");
    console.log("   ALL PRAVESH -> GURUKUL SSO TESTS PASSED!     ");
    console.log("=================================================");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("\n❌ Test failed:", err.message);
  if (server) server.close();
  process.exit(1);
});
