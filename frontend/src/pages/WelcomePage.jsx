import { Link, Navigate, useLocation } from "react-router-dom";

const WelcomePage = () => {
  const location = useLocation();

  if (location.search && location.search.includes("email")) {
    return <Navigate to={`/login${location.search}`} replace />;
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Welcome to BHIV Core</h1>
        <p>Identity and product launcher for all Blackhole Infiverse applications.</p>
        <div className="header-actions">
          <Link to={`/login${location.search}`}>
            <button type="button">Continue with Blackhole</button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default WelcomePage;
