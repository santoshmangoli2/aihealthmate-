// src/pages/Reminder.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Reminder() {
  const [reminders, setReminders] = useState(() => {
    return JSON.parse(localStorage.getItem("reminders")) || [];
  });

  const [form, setForm] = useState({ medicine: "", time: "" });
  const [errors, setErrors] = useState({});
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [alertedTimes, setAlertedTimes] = useState([]);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"

      reminders.forEach((reminder, index) => {
        if (
          reminder.time === currentTime &&
          !alertedTimes.includes(`${reminder.time}-${reminder.medicine}`)
        ) {
          alert(`🕑 Time to take your medicine: ${reminder.medicine}`);
          setAlertedTimes(prev => [...prev, `${reminder.time}-${reminder.medicine}`]);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders, alertedTimes]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!form.medicine.trim()) errors.medicine = "Medicine name is required.";
    if (!form.time) errors.time = "Time is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updated = [...reminders, form].sort((a, b) => a.time.localeCompare(b.time));
    setReminders(updated);
    setForm({ medicine: "", time: "" });
    setErrors({});
  };

  const handleDelete = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
    setAlertedTimes([]); // Reset alerts
  };

  const handleClearAll = () => {
    setReminders([]);
    setShowConfirmClear(false);
    setAlertedTimes([]);
  };

  return (
    <div className="container col-md-6 py-4">
      <h3 className="mb-4 text-success text-center">💊 Medicine Reminder</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border border-success">
        <div className="mb-3">
          <label className="form-label fw-semibold">Medicine Name</label>
          <input
            type="text"
            className={`form-control ${errors.medicine ? "is-invalid" : ""}`}
            name="medicine"
            value={form.medicine}
            onChange={handleChange}
            placeholder="e.g., Paracetamol"
          />
          {errors.medicine && <div className="invalid-feedback">{errors.medicine}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Time</label>
          <input
            type="time"
            className={`form-control ${errors.time ? "is-invalid" : ""}`}
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          {errors.time && <div className="invalid-feedback">{errors.time}</div>}
        </div>

        <button className="btn btn-success w-100">➕ Add Reminder</button>
      </form>

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">⏰ Your Reminders</h5>
          {reminders.length > 0 && (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => setShowConfirmClear(true)}
            >
              Clear All
            </button>
          )}
        </div>

        {reminders.length === 0 ? (
          <p className="text-muted mt-3">No reminders set.</p>
        ) : (
          <ul className="list-group mt-2">
            {reminders.map((r, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{r.medicine}</strong>
                  <div className="text-muted small">{r.time}</div>
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showConfirmClear && (
        <div className="alert alert-warning mt-4 d-flex justify-content-between align-items-center">
          <span>Are you sure you want to clear all reminders?</span>
          <div>
            <button className="btn btn-sm btn-danger me-2" onClick={handleClearAll}>
              Yes, Clear
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setShowConfirmClear(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reminder;
