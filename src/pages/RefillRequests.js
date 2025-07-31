import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./RefillRequests.css"; // Optional: custom styles

const API = "http://localhost:5000/api/refills";

function RefillRequests() {
  const [requests, setRequests] = useState([]);
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);

  const patientId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/patient/${patientId}`);
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, { patientId, doctorId, medication, dosage });
      setMedication("");
      setDosage("");
      setDoctorId("");
      fetchRequests();
    } catch (err) {
      console.error("Error submitting request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchDoctors();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">💊 Request a Prescription Refill</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm mb-4 bg-light">
        <div className="mb-3">
          <label>Doctor</label>
          <select
            className="form-select"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Medication</label>
          <input
            type="text"
            className="form-control"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Dosage</label>
          <input
            type="text"
            className="form-control"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Request
        </button>
      </form>

      <h4 className="mb-3">📄 Your Previous Requests</h4>
      {requests.length === 0 ? (
        <p>No refill requests found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Requested At</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.medication}</td>
                <td>Dr. {req.Doctor?.name}</td>
                <td>{req.status}</td>
                <td>{new Date(req.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RefillRequests;
