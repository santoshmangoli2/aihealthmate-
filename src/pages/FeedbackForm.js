// src/pages/FeedbackForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedbackForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  // Fetch all doctors so patient can choose whom to review
  useEffect(() => {
    axios.get("/api/doctors")
      .then(resp => {
        setDoctors(resp.data);
        if (resp.data.length) setDoctorId(resp.data[0].id);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem("userId");
      await axios.post("/api/feedback", { patientId, doctorId, rating, comment });
      setMessage("Thank you for your feedback!");
      setComment("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h3 className="mb-3">⭐ Give Feedback</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Select Doctor</label>
          <select
            className="form-select"
            value={doctorId}
            onChange={e => setDoctorId(e.target.value)}
          >
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          >
            {[1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n} Star{n>1?'s':''}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Comments</label>
          <textarea
            className="form-control"
            rows="3"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <button className="btn btn-dark w-100">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
