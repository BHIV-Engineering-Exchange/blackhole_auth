import { useMemo, useState } from "react";
import AppCard from "../components/AppCard";
import Spinner from "../components/Spinner";
import { ALL_APPS } from "../constants/apps";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout, fetchMe } = useAuth();
  const [launchingKey, setLaunchingKey] = useState("");
  const [error, setError] = useState("");

  const allowedSet = useMemo(
    () => new Set((user?.allowedApps || []).map((v) => v.toLowerCase())),
    [user]
  );
  const visibleApps = useMemo(
    () => ALL_APPS.filter((app) => allowedSet.has(app.key)),
    [allowedSet]
  );
  const isAdmin = user?.roles?.includes("admin");

  const launchApp = async (app) => {
    console.log("🚀 launchApp called for:", app);
    console.log("Current user:", user);
    setError("");

    const isAllowed = (user?.allowedApps || []).some(
      (a) => a.toLowerCase() === app.key.toLowerCase()
    );

    if (!isAllowed) {
      console.warn("⛔ Access denied by local check. allowedApps:", user?.allowedApps);
      setError(`Access denied: ${app.name} is not in your allowed app list.`);
      return;
    }

    console.log("Opening new tab for target URL:", app.url);
    const newWindow = window.open("about:blank", "_blank");
    setLaunchingKey(app.key);
    try {
      console.log("Fetching latest user session (fetchMe)...");
      const sessionUser = await fetchMe();
      console.log("Session user received:", sessionUser);

      const serverIsAllowed = (sessionUser?.allowedApps || []).some(
        (a) => a.toLowerCase() === app.key.toLowerCase()
      );

      if (!sessionUser || !serverIsAllowed) {
        console.warn("⛔ Access denied by server check. sessionUser:", sessionUser);
        if (newWindow) newWindow.close();
        if (!sessionUser) logout();
        else setError(`Access denied: ${app.name} is not in your allowed app list.`);
        return;
      }

      console.log("✅ Navigating window to:", app.url);
      if (newWindow) {
        newWindow.location.href = app.url;
      } else {
        window.location.href = app.url;
      }
    } catch (err) {
      console.error("❌ Error launching app:", err);
      if (newWindow) newWindow.close();
      logout();
    } finally {
      setLaunchingKey("");
    }
  };

  if (!user) return <Spinner label="Loading dashboard..." />;

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

      <section>
        <h2>Product Launcher</h2>
        <p>Select an app to continue with single sign-on.</p>
      </section>

      <section className="app-grid">
        {ALL_APPS.map((app) => {
          const disabled = !allowedSet.has(app.key);
          return (
            <AppCard
              key={app.key}
              app={app}
              onLaunch={launchApp}
              disabled={disabled || launchingKey.length > 0}
            />
          );
        })}
      </section>

      {visibleApps.length === 0 ? (
        <p className="empty-state">
          No apps assigned to your account yet. Contact your administrator.
        </p>
      ) : null}
    </main>
  );
};

export default DashboardPage;
