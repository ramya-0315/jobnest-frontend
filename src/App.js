import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from "./pages/ResetPassword";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import ResumeUpload from "./pages/ResumeUpload";
import JobApplication from "./pages/JobApplication";
import EmployerDashboardLayout from "./dashboard/employer/EmployerDashboardLayout";
import PostJobSection from "./dashboard/employer/PostJobSection";
import ManageJobsSection from "./dashboard/employer/ManageJobsSection";
import ApplicationsSection from "./dashboard/employer/ApplicationsSection";
import CandidatesSection from "./dashboard/employer/CandidatesSection";
import CompanyProfileSection from "./dashboard/employer/CompanyProfileSection";
import NotificationsSection from "./dashboard/employer/NotificationsSection";
import SettingsSection from "./dashboard/employer/SettingsSection";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute"; // ✅ new

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/jobs/:id" element={<JobDetails />} />

            {/* ✅ Authenticated Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/resume-upload" element={<ResumeUpload />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/apply/:id" element={<JobApplication />} />
            </Route>

            {/* ✅ Job Seeker Only */}
            <Route element={<RoleProtectedRoute allowedRoles={["JOB_SEEKER"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* ✅ Employer Only */}
            <Route element={<RoleProtectedRoute allowedRoles={["EMPLOYER"]} />}>
  <Route path="/employer-dashboard" element={<EmployerDashboardLayout />}>
    <Route path="post-job" element={<PostJobSection />} />
    <Route path="manage-jobs" element={<ManageJobsSection />} />
    <Route path="applications" element={<ApplicationsSection />} />
    <Route path="candidates" element={<CandidatesSection />} />
    <Route path="profile" element={<CompanyProfileSection />} />
    <Route path="notifications" element={<NotificationsSection />} />
    <Route path="settings" element={<SettingsSection />} />
  </Route>
</Route>

            {/* ✅ Admin Only */}
            <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ✅ Admins can also use every route, so include shared routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboardLayout/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/resume-upload" element={<ResumeUpload />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/apply/:id" element={<JobApplication />} />
            </Route>
          </Routes>

          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
