// src/pages/PatientProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm({ name: res.data.name, email: res.data.email }))
      .catch(console.error);
  }, [token]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(
        "/api/patients/me",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => alert("Profile updated"))
      .catch(err => alert(err.response?.data?.error || err.message));
  };

  return (
    <div className="container col-md-6 mt-5">
      <h3 className="mb-4">My Profile</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-success w-100">Save Changes</button>
      </form>
    </div>
  );
};

export default PatientProfile;
