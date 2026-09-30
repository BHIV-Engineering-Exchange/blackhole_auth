import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email) return;
      setLoading(true);
      setError("");
      try {
        await login(email);
        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.error || "Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, login, navigate]
  );

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>BHIV Core</h1>
        <p>Sign in with your Blackhole account to access your products.</p>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (e.g. user@example.com)"
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
