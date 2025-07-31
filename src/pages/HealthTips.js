// src/pages/HealthTips.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const tips = [
  {
    title: "💧 Stay Hydrated",
    content: "Drink at least 8–10 glasses of water daily to keep your body hydrated and your organs functioning properly.",
  },
  {
    title: "🥗 Eat Balanced Meals",
    content: "Include vegetables, fruits, proteins, and whole grains in your daily diet to maintain energy and overall health.",
  },
  {
    title: "🏃‍♀️ Exercise Regularly",
    content: "Engage in at least 30 minutes of moderate physical activity, such as brisk walking or yoga, five days a week.",
  },
  {
    title: "🛌 Get Enough Sleep",
    content: "Aim for 7–9 hours of quality sleep every night to allow your body to recover and boost immunity.",
  },
  {
    title: "🧘 Mental Wellness",
    content: "Practice meditation or deep breathing exercises to reduce stress and enhance focus.",
  },
  {
    title: "🦷 Dental Hygiene",
    content: "Brush twice daily, floss regularly, and visit the dentist every 6 months to maintain oral health.",
  },
];

const HealthTips = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-success">📚 Health Tips</h2>
      <p className="text-center text-muted mb-5">Simple daily habits to boost your physical and mental well-being.</p>

      <div className="row g-4">
        {tips.map((tip, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{tip.title}</h5>
                <p className="card-text text-secondary">{tip.content}</p>
              </div>
              <div className="card-footer bg-white border-0 text-end">
                <span className="text-muted small">#Tip {index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;
