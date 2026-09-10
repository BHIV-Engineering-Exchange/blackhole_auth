import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import client from "../api/client";

const LoginPage = () => {
  const { fetchMe } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) return;
      setLoading(true);
      setError("");

      try {
        await client.post("/api/login", { email });
        await fetchMe();
      } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, fetchMe]
  );

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

