import React, { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionViewer = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await axios.get("/api/prescriptions/patient", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setPrescriptions(res.data);
      } catch (err) {
        console.error("Error fetching prescriptions", err);
      }
    };
    fetchPrescriptions();
  }, []);

  return (
    <div className="container mt-4">
      <h2>💊 Your Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <div className="row g-3">
          {prescriptions.map((presc) => (
            <div key={presc.id} className="col-md-6 col-lg-4">
              <div className="card shadow p-3">
                <h5 className="card-title">From Dr. {presc.Doctor?.name}</h5>
                <p>{presc.description || "No description"}</p>
                <a
                  href={`/${presc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary"
                >
                  View / Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionViewer;
