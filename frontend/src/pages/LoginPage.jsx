import { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const LoginPage = () => {
  const { fetchMe } = useAuth();
  const [searchParams] = useSearchParams();
  // ?embed=1&app=<key> — the sign-in popup a product opens when a guest hits
  // a gated action. It posts success back to the opener and closes itself.
  const isEmbed = searchParams.get("embed") === "1";
  const [email, setEmail] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("email") || "";
    } catch {
      return "";
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleLogin = useCallback(
    async (e, emailOverride) => {
      if (e) e.preventDefault();
      const targetEmail = (emailOverride || email || "").trim();
      if (!targetEmail) return;
      setLoading(true);
      setError("");

      try {
        await client.post("/api/login", { email: targetEmail });
        if (isEmbed) {
          // Tell the product (which owns this window) to re-check the session,
          // then get out of the way. No secrets in the message — just a ping.
          (window.opener || window.parent)?.postMessage(
            { type: "blackhole-auth-success" },
            "*"
          );
          setDone(true);
          window.close();
          return;
        }
        await fetchMe();
      } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, fetchMe, isEmbed]
  );

  // Auto-login when arriving from external apps with ?email=...&auto=true
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      const autoParam = params.get("auto");
      if (emailParam) {
        handleLogin(null, emailParam);
      }
    } catch (err) {
      console.warn("Failed to parse URL params:", err);
    }
  }, [handleLogin]);

  if (isEmbed && done) {
    return (
      <main className="auth-shell">
        <section className="auth-card">
          <h1>Signed in</h1>
          <p>You can close this window and continue in the product.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>BHIV Core</h1>
        <p>
          {isEmbed
            ? "Sign in to continue — this unlocks the full product."
            : "Sign in with your Blackhole account to access your products."}
        </p>

        {error && <div style={{ color: "#ff4d4f", marginBottom: "1rem" }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>
          <button type="submit" className="bh-login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Continue with Blackhole"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
