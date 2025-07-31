// src/components/Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link text-dark fw-bold" : "nav-link text-dark";

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand text-primary fw-bold" to="/">
          AI HealthMate
        </NavLink>
        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {role === "patient" && (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/reminders" className={linkClass}>
                    Reminders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/records" className={linkClass}>
                    Records
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/symptom-checker" className={linkClass}>
                    Symptom Checker
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/prescriptions" className={linkClass}>
                    Prescriptions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/chat" className={linkClass}>
                    Chat
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/give-feedback" className={linkClass}>
                    Feedback
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/health-tips" className={linkClass}>
                    Health Tips
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/emergency" className={linkClass}>
                    Emergency
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/patient/profile" className={linkClass}>
                    Profile
                  </NavLink>
                </li>
              </>
            )}

            {role === "doctor" && (
              <>
                <li className="nav-item">
                  <NavLink to="/doctor/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/doctor/appointments" className={linkClass}>
                    Appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/records" className={linkClass}>
                    Patient Records
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/symptom-checker" className={linkClass}>
                    Symptom Checker
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/messages" className={linkClass}>
                    Messages
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/feedback-view" className={linkClass}>
                    Feedback
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/doctor/profile" className={linkClass}>
                    Profile
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item">
              <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
