import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const PublicRoute = ({ children }) => {
  const { user, isBootstrapping } = useAuth();
  const location = useLocation();

  // The embed sign-in popup (?embed=1) must always render the form, even when
  // a guest cookie already makes `user` truthy — otherwise the popup would
  // bounce to the dashboard instead of asking for the Blackhole ID.
  const isEmbed = new URLSearchParams(location.search).get("embed") === "1";

  if (isBootstrapping && !isEmbed) return <Spinner label="Checking secure session..." />;
  if (user && !isEmbed) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;
