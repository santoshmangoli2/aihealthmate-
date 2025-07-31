// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [role, setRole] = useState("patient");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ ...form, role });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.name);

      if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Login</h3>

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

        <form onSubmit={handleSubmit}>
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
            Login as {role}
          </button>
        </form>

        <button
          className="btn btn-link mt-3"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
}

export default Login;
