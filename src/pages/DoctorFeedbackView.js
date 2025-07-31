// src/pages/DoctorFeedbackView.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorFeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const doctorId = localStorage.getItem("userId");
    axios.get(`/api/feedback/doctor/${doctorId}`)
      .then(resp => setFeedbacks(resp.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">⭐ Patient Feedback</h3>
      {feedbacks.length === 0 ? (
        <p className="text-muted">No feedback yet.</p>
      ) : (
        <div className="list-group">
          {feedbacks.map(fb => (
            <div key={fb.id} className="list-group-item mb-2 shadow-sm">
              <div className="d-flex justify-content-between">
                <strong>{fb.Patient.name}</strong>
                <span>{fb.rating} ⭐</span>
              </div>
              {fb.comment && <p className="mt-2">{fb.comment}</p>}
              <small className="text-muted">
                {new Date(fb.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorFeedbackView;
