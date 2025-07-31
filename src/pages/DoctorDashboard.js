// src/pages/DoctorDashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function DoctorDashboard() {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const downloadPatientReport = () => {
    window.open(`/api/reports/doctor/${doctor?.id}`, "_blank");
  };

  const features = [
    {
      title: "📁 Patient Records",
      text: "Access and review uploaded medical documents and lab reports.",
      to: "/records",
      btn: "View Records",
      variant: "primary",
    },
    {
      title: "📅 Appointments",
      text: "View and manage upcoming patient appointments.",
      to: "/doctor/appointments",
      btn: "Manage Appointments",
      variant: "secondary",
    },
    {
      title: "💬 Patient Chat",
      text: "Chat with your patients for follow-up or advice.",
      to: "/messages",
      btn: "Chat with Patients",
      variant: "warning",
    },
    {
      title: "💊 Prescriptions",
      text: "Create and manage digital prescriptions.",
      to: "/prescriptions",
      btn: "Write Prescription",
      variant: "info",
    },
    {
      title: "📤 Upload Reports",
      text: "Upload prescriptions, scans, or diagnosis reports for patients.",
      to: "/upload",
      btn: "Upload Files",
      variant: "success",
    },
    {
      title: "🎥 Video Consult",
      text: "Start a video consultation session with a patient.",
      to: "/video-call",
      btn: "Start Call",
      variant: "danger",
    },
    {
      title: "📊 Analytics",
      text: "View trends and health statistics of patients.",
      to: "/analytics",
      btn: "View Analytics",
      variant: "dark",
    },
    {
      title: "⭐ Feedback",
      text: "Read feedback and reviews from patients.",
      to: "/doctor/feedback",
      btn: "Patient Feedback",
      variant: "light",
    },
    {
  title: "📤 Upload Prescription",
  text: "Send scanned prescriptions to your patient.",
  to: "/upload",
  btn: "Upload",
  variant: "success",
},

    {
      title: "📄 Download Report",
      text: "Download patient medical summary as PDF.",
      btn: "Download Summary",
      variant: "secondary",
      customAction: true,
      onClick: downloadPatientReport,
    },
  ];

  return (
    <div className="giri-dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 py-2 shadow">
        <span className="navbar-brand fw-bold">🩺 AI HealthMate – Doctor Panel</span>
      </nav>

      {/* Dashboard Grid */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Welcome, Doctor</h2>
          <p className="text-muted">
            Use the tools below to manage appointments, patients, prescriptions, and more.
          </p>
        </div>

        <div className="row g-4">
          {features.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="card h-100 shadow giri-card p-3 border border-light">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
                {item.customAction ? (
                  <button
                    className={`btn btn-outline-${item.variant} w-100`}
                    onClick={item.onClick}
                  >
                    {item.btn}
                  </button>
                ) : (
                  <Link to={item.to} className={`btn btn-outline-${item.variant} w-100`}>
                    {item.btn}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
