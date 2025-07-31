import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const downloadReport = () => {
    window.open(`/api/reports/${user?.id}`, "_blank");
  };

  const dashboardItems = [
    {
      title: "⏰ Reminders",
      text: "Set daily medication & check‑up reminders.",
      to: "/reminders",
      btn: "Manage Reminders",
      variant: "primary",
    },
    {
      title: "📁 Medical Records",
      text: "Upload and view lab reports, prescriptions, etc.",
      to: "/records",
      btn: "View Records",
      variant: "success",
    },
    {
      title: "🧠 Symptom Checker",
      text: "Use AI to analyze your health symptoms easily.",
      to: "/symptom-checker",
      btn: "Check Symptoms",
      variant: "info",
    },
    {
      title: "📅 Appointments",
      text: "Book and manage your doctor appointments.",
      to: "/appointments",
      btn: "Open Appointments",
      variant: "secondary",
    },
    {
  title: "💊 My Prescriptions",
  text: "View/download prescriptions shared by your doctor.",
  to: "/my-prescriptions",
  btn: "View",
  variant: "warning",
},

    {
      title: "💬 Chat with Doctor",
      text: "Communicate with your assigned healthcare professional.",
      to: "/chat",
      btn: "Start Chat",
      variant: "danger",
    },
    {
      title: "📚 Health Tips",
      text: "Get daily lifestyle and nutrition advice.",
      to: "/health-tips",
      btn: "View Tips",
      variant: "info",
    },
    {
      title: "⭐ Give Feedback",
      text: "Share your experience with your doctor.",
      to: "/feedback",
      btn: "Submit Feedback",
      variant: "dark",
    },
    {
      title: "📄 Health Report",
      text: "Download your medical summary as a PDF.",
      btn: "Download Report",
      variant: "secondary",
      customAction: true,
      onClick: downloadReport,
    },
    {
      title: "🚑 Emergency Help",
      text: "Quick access to ambulance & nearby hospitals.",
      to: "/emergency",
      btn: "Open Emergency Panel",
      variant: "light",
      bg: "danger",
      text: "white",
    },
  ];

  return (
    <div className="giri-dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-4 py-2 shadow">
        <span className="navbar-brand fw-bold">🩺 AI HealthMate – Patient Panel</span>
        <div className="ms-auto">
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Welcome, Patient</h2>
          <p className="text-muted">Access personalized health tools below.</p>
        </div>

        <div className="row g-4">
          {dashboardItems.map((item, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div
                className={`card h-100 shadow giri-card p-3 ${
                  item.bg ? `bg-${item.bg} text-${item.text}` : ""
                }`}
              >
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
};

export default PatientDashboard;
