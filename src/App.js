// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import Reminder from "./pages/Reminder";
import Records from "./pages/PatientRecords";
import Dashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import SymptomChecker from "./pages/SymptomChecker";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import ChatWithDoctor from "./pages/ChatWithDoctor";
import ChatWithPatient from "./pages/ChatWithPatient";
import HealthTips from "./pages/HealthTips";
import EmergencyPanel from "./pages/EmergencyPanel";
import DoctorAppointments from "./pages/DoctorAppointments";
import FeedbackForm from "./pages/FeedbackForm";
import DoctorFeedbackView from "./pages/DoctorFeedbackView";
import RefillRequests from "./pages/RefillRequests";
import DoctorRefillRequests from "./pages/DoctorRefillRequests";
import UploadPrescription from "./pages/UploadPrescription";
import PrescriptionViewer from "./pages/PrescriptionViewer";
import "./App.css";

// 404 fallback component
const NotFound = () => (
  <div className="text-center mt-5">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for doesn’t exist.</p>
  </div>
);

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const role = localStorage.getItem("role");
  const hideNavbarOn = ["/login", "/register"];
  const showNavbar = isLoggedIn && !hideNavbarOn.includes(window.location.pathname);

  return (
    <Router>
      {showNavbar && <Navbar />}
      <div className="container py-4">
        <Routes>
          {/* Default Redirect */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to={role === "doctor" ? "/doctor/dashboard" : "/dashboard"} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Profile */}
          <Route
            path="/patient/profile"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />

          {/* Patient-only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reminders"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <Reminder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prescriptions"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <Prescriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <ChatWithDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/health-tips"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <HealthTips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emergency"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <EmergencyPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <FeedbackForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/refills"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <RefillRequests />
              </ProtectedRoute>
            }
          />

          {/* Shared (doctor + patient) */}
          <Route
            path="/records"
            element={
              <ProtectedRoute allowedRoles={["doctor", "patient"]}>
                <Records />
              </ProtectedRoute>
            }
          />
          <Route
            path="/symptom-checker"
            element={
              <ProtectedRoute allowedRoles={["doctor", "patient"]}>
                <SymptomChecker />
              </ProtectedRoute>
            }
          />

          {/* Doctor-only */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <ChatWithPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/feedback"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorFeedbackView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/refills"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorRefillRequests />
              </ProtectedRoute>
            }
          />
          <Route
  path="/upload"
  element={
    <ProtectedRoute allowedRoles={["doctor"]}>
      <UploadPrescription />
    </ProtectedRoute>
  }
/>

// Add to patient routes
<Route
  path="/my-prescriptions"
  element={
    <ProtectedRoute allowedRoles={["patient"]}>
      <PrescriptionViewer />
    </ProtectedRoute>
  }
/>

          {/* Catch‑all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
