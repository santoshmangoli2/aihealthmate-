import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const doctors = [
  { id: 1, name: "Dr. Neha Kapoor", location: "Apollo Hospital, Delhi" },
  { id: 2, name: "Dr. Sanjay Verma", location: "Fortis, Mumbai" },
  { id: 3, name: "Dr. Ravi Shetty", location: "NIMHANS, Bangalore" },
];

function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleBook = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !time || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        {
          doctorId: selectedDoctor,
          date,
          time,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("✅ Appointment booked successfully!");
      setSelectedDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("❌ Error booking appointment");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">🩺 Book an Appointment</h2>
      <form onSubmit={handleBook} className="mx-auto p-4 border rounded shadow" style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label fw-bold">Select Doctor</label>
          <select className="form-select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} - {doc.location}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Time</label>
          <input type="time" className="form-control" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Reason</label>
          <textarea className="form-control" value={reason} onChange={(e) => setReason(e.target.value)} />
        </div>
        <button className="btn btn-success w-100">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointments;
