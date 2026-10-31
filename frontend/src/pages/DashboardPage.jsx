import { useEffect, useMemo, useState } from "react";
import AppCard from "../components/AppCard";
import Spinner from "../components/Spinner";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout, fetchMe } = useAuth();
  const [apps, setApps] = useState(null);
  const [appsError, setAppsError] = useState("");
  const [launchingKey, setLaunchingKey] = useState("");
  const [error, setError] = useState("");

  // Product list comes from the backend registry (backend/data/apps.json), so
  // a new product shows up here without touching this file.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await client.get("/api/apps");
        if (mounted) setApps(Array.isArray(data?.apps) ? data.apps : []);
      } catch (err) {
        if (mounted) {
          setAppsError(err.response?.data?.error || "Could not load the product list.");
          setApps([]);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Gate 2: only products present in the session's allowedApps are shown.
  const allowedSet = useMemo(
    () => new Set((user?.allowedApps || []).map((v) => v.toLowerCase())),
    [user]
  );
  const visibleApps = useMemo(
    () => (apps || []).filter((app) => allowedSet.has(String(app.key).toLowerCase())),
    [apps, allowedSet]
  );
  const isAdmin = user?.roles?.includes("admin");

  const launchApp = async (app) => {
    setError("");
    setLaunchingKey(app.key);
    try {
      // Re-check the session right before navigating; the server remains the
      // authority on which products this account may open.
      const sessionUser = await fetchMe();
      if (!sessionUser) {
        logout();
        return;
      }

      const serverAllowed = (sessionUser.allowedApps || []).some(
        (a) => String(a).toLowerCase() === String(app.key).toLowerCase()
      );
      if (!serverAllowed) {
        setError(`Access denied: ${app.name} is not in your allowed app list.`);
        return;
      }

      // Make sure a session cookie exists for the product to pick up: a real
      // one if signed in, a guest one otherwise — so the product never boots
      // into its own sign-in page.
      await client.get("/api/sso/guest").catch(() => {});

      const targetUrl =
        (import.meta.env.DEV || window.location.hostname === "localhost") && app.devUrl
          ? app.devUrl
          : app.url;
      const opened = window.open(targetUrl, "_blank");
      if (!opened) {
        // Popup blocked — open the product in this tab instead of doing nothing.
        window.location.href = targetUrl;
      }
    } catch (err) {
      console.error("Error launching app:", err);
      logout();
    } finally {
      setLaunchingKey("");
    }
  };

  if (!user || apps === null) return <Spinner label="Loading dashboard..." />;

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user.email}</h1>
          {isAdmin ? (
            <span className="pill">Admin</span>
          ) : (
            <span className="pill secondary">User</span>
          )}
        </div>
        <div className="header-actions">
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error ? <p className="error-text">{error}</p> : null}
      {appsError ? <p className="error-text">{appsError}</p> : null}

      <section>
        <h2>Product Launcher</h2>
        <p>Select an app to continue with single sign-on.</p>
      </section>

      <section className="app-grid">
        {visibleApps.map((app) => (
          <AppCard
            key={app.key}
            app={app}
            onLaunch={launchApp}
            disabled={launchingKey.length > 0}
            launching={launchingKey === app.key}
          />
        ))}
      </section>

      {visibleApps.length === 0 && !appsError ? (
        <div className="empty-state">
          <p>No products available for your account.</p>
          <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            {user?.allowedApps?.length
              ? `Your access list: ${user.allowedApps.join(", ")}`
              : "No apps have been assigned to your account yet."}
            {" "}Contact your administrator if this seems incorrect.
          </p>
        </div>
      ) : null}
    </main>
  );
};

export default DashboardPage;
