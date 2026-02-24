import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const orgId = localStorage.getItem("orgId");

  // Not authenticated
  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but no organization
  if (!orgId && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default ProtectedRoute;