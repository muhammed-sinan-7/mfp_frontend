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
import { Navigate } from "react-router-dom";
import PostsPage from "./pages/PostManagement";
import RecycleBinPage from "./pages/RecycleBin";
import { Toaster } from "sonner";
import Analytics from "./pages/Analytics";
// import CreateSchedulePage from "./pages/CreateSchedulePage";
import News from "./pages/News";

function App() {
  return (
    <>
      <Toaster
        richColors
        expand
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/overview" replace />}
          />
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/overview" element={<Overview />} />
            <Route path="/accounts" element={<ConnectedAccounts />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            {/* <Route path="/schedule/create" element={<CreateSchedulePage />} /> */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/team" element={<div>Team</div>} />
            <Route path="/audit" element={<AuditLogs />} />
            <Route path="/recycle-bin" element={<RecycleBinPage />} />
            <Route path="/settings" element={<div>Settings</div>} />
            <Route path="/feeds" element={<News />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
