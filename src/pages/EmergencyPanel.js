// src/pages/EmergencyPanel.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const EmergencyPanel = () => {
  const [showGuide, setShowGuide] = useState(false);

  const toggleGuide = () => setShowGuide(!showGuide);

  return (
    <div className="container py-5">
      <h2 className="text-center text-danger fw-bold mb-4">🚑 Emergency Panel</h2>
      <p className="text-center text-muted mb-4">Access emergency services instantly.</p>

      <div className="row g-4">
        {/* Example: Call Ambulance */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-danger shadow h-100">
            <div className="card-body text-danger">
              <h5 className="card-title fw-bold">🚨 Call Ambulance</h5>
              <p className="card-text">Dial 108 or tap below to make an emergency call.</p>
              <a href="tel:108" className="btn btn-danger w-100">📞 Call 108</a>
            </div>
          </div>
        </div>

        {/* First Aid Guide */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-success shadow h-100">
            <div className="card-body text-success">
              <h5 className="card-title fw-bold">🩹 First Aid Guide</h5>
              <p className="card-text">Learn life-saving steps you can take before help arrives.</p>
              <button className="btn btn-success w-100" onClick={toggleGuide}>
                📘 Open Guide
              </button>
            </div>
          </div>
        </div>

        {/* You can include more emergency cards below */}
      </div>

      {/* First Aid Modal */}
      {showGuide && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content border-success shadow">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">🩹 First Aid Guide</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={toggleGuide}></button>
                </div>
                <div className="modal-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>🩸 Bleeding:</strong> Apply pressure with a clean cloth and elevate the wound.
                    </li>
                    <li className="list-group-item">
                      <strong>🔥 Burns:</strong> Cool with running water for 10 minutes. Avoid creams.
                    </li>
                    <li className="list-group-item">
                      <strong>😮‍💨 Choking:</strong> Perform 5 back blows followed by 5 abdominal thrusts (Heimlich).
                    </li>
                    <li className="list-group-item">
                      <strong>❤️ CPR:</strong> 30 compressions + 2 rescue breaths (if trained).
                    </li>
                    <li className="list-group-item">
                      <strong>🦴 Fractures:</strong> Immobilize and avoid movement. Seek help.
                    </li>
                    <li className="list-group-item">
                      <strong>😵‍💫 Fainting:</strong> Lay the person down and elevate their legs.
                    </li>
                    <li className="list-group-item">
                      <strong>⚡ Seizures:</strong> Clear the area and cushion the person’s head.
                    </li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" onClick={toggleGuide}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default EmergencyPanel;
