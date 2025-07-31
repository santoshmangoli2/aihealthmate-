// src/pages/Prescriptions.js
import React, { useEffect, useState } from "react";

const prescriptions = [
  {
    email: "patient1@example.com",
    doctor: "Dr. Sharma",
    date: "2025-07-10",
    medicines: ["Paracetamol 500mg", "Vitamin D3", "Antibiotics"],
    notes: "Take medicines after food for 5 days.",
  },
  {
    email: "patient2@example.com",
    doctor: "Dr. Reddy",
    date: "2025-07-08",
    medicines: ["Ibuprofen", "Omeprazole"],
    notes: "Follow up in 3 days.",
  },
];

const Prescriptions = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPrescriptions, setUserPrescriptions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user?.email) {
      setUserEmail(user.email);
      const filtered = prescriptions.filter((p) => p.email === user.email);
      setUserPrescriptions(filtered);
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">My Prescriptions</h2>
        <hr className="w-25 mx-auto" />
      </div>

      {userPrescriptions.length === 0 ? (
        <div className="alert alert-warning text-center">
          No prescriptions found for <strong>{userEmail}</strong>
        </div>
      ) : (
        <div className="row">
          {userPrescriptions.map((prescription, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card border-primary shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  Prescribed by: <strong>{prescription.doctor}</strong>
                </div>
                <div className="card-body">
                  <p><strong>Date:</strong> {prescription.date}</p>

                  <p className="mb-1"><strong>Medicines:</strong></p>
                  <ul className="list-group list-group-flush mb-3">
                    {prescription.medicines.map((medicine, i) => (
                      <li key={i} className="list-group-item">
                        {medicine}
                      </li>
                    ))}
                  </ul>

                  <p><strong>Notes:</strong> {prescription.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
