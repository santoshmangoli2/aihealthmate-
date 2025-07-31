import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadPrescription = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/patients", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !file) return alert("All fields required!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", selectedPatient);
    formData.append("description", description);

    try {
      await axios.post("/api/prescriptions/upload", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Prescription uploaded successfully!");
      setSelectedPatient("");
      setFile(null);
      setDescription("");
    } catch (err) {
      setMessage("Failed to upload.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>📤 Upload Prescription</h2>
      <form onSubmit={handleUpload} className="shadow p-4 rounded bg-light">
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label className="form-label">Select Patient</label>
          <select
            className="form-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            required
          >
            <option value="">-- Choose Patient --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Prescription File</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description (optional)</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPrescription;
