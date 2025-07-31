// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ ...form, role });
      setSuccess("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Register</h3>

        <div className="btn-group w-100 mb-3" role="group">
          <button
            className={`btn btn-outline-primary ${role === "patient" ? "active" : ""}`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`btn btn-outline-success ${role === "doctor" ? "active" : ""}`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register as {role}
          </button>
        </form>

        <button
          className="btn btn-link mt-3"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
}

export default Register;
