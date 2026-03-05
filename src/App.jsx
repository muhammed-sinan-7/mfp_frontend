import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Overview from "./features/Dashboard/Overview";
import "./App.css";
import LandingPage from "./pages/Landing";
import ConnectedAccounts from "./pages/ConnectedAccounts";
import AuditLogs from "./pages/AuditLogs";
import SchedulePage from "./pages/Schedule";
import CreatePost from "./pages/CreatePost";
import PostsPage from "./pages/PostManagement";
{/* <Route path="/dashboard/audit" element={<AuditLogs />} /> */}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
         
          <Route index element={<Overview />} />
          <Route path="analytics" element={<div>Analytics</div>} />
          <Route path="team" element={<div>Team</div>} />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="accounts" element={<ConnectedAccounts />} />
          <Route path="audit" element={<AuditLogs />} />
          <Route path="scheduler" element={<SchedulePage />} />
          <Route path="posts" element={<PostsPage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
