import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">📅 All Booked Appointments</h2>
      {appointments.length === 0 ? (
        <div className="alert alert-warning text-center">No appointments found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{a.patientId}</td>
                  <td>{a.doctorId}</td>
                  <td>{a.reason}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
