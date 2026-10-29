import { useCallback, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const LoginPage = () => {
  const { fetchMe } = useAuth();
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

  const handleLogin = useCallback(
    async (e, emailOverride) => {
      if (e) e.preventDefault();
      const targetEmail = (emailOverride || email || "").trim();
      if (!targetEmail) return;
      setLoading(true);
      setError("");

      try {
        await client.post("/api/login", { email: targetEmail });
        await fetchMe();
      } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, fetchMe]
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

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>BHIV Core</h1>
        <p>Sign in with your Blackhole account to access your products.</p>

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

