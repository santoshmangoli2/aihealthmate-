import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorRefillRequests = () => {
  const [requests, setRequests] = useState([]);
  const doctorId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/refills/doctor/${doctorId}`);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching doctor refill requests", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/refills/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">💊 Patient Refill Requests</h2>
      {requests.length === 0 ? (
        <p>No refill requests found.</p>
      ) : (
        <table className="table table-bordered shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Patient</th>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.Patient?.name}</td>
                <td>{req.medication}</td>
                <td>{req.dosage}</td>
                <td>{req.status}</td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
                <td>
                  {req.status === "pending" ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateStatus(req.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(req.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`badge bg-${req.status === "approved" ? "success" : "danger"}`}>
                      {req.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorRefillRequests;
