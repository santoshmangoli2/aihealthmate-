import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatWithPatient = () => {
  const doctorId = localStorage.getItem("userId");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    // Fetch patients the doctor has seen (via appointments)
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`/api/doctors/${doctorId}/patients`);
        setPatients(res.data || []);
        if (res.data.length > 0) {
          setSelectedPatientId(res.data[0].id);
        }
      } catch (err) {
        console.error("Error loading patients", err);
      }
    };

    if (doctorId) fetchPatients();
  }, [doctorId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchMessages = async () => {
        try {
          const res = await axios.get("/api/chat", {
            params: {
              senderId: doctorId,
              receiverId: selectedPatientId,
            },
          });
          setChat(res.data);
        } catch (err) {
          console.error("Error loading messages", err);
        }
      };

      if (doctorId && selectedPatientId) fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, [doctorId, selectedPatientId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post("/api/chat", {
        senderId: doctorId,
        receiverId: selectedPatientId,
        message,
      });
      setMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3 text-success">💬 Chat with Patient</h3>

      <div className="mb-3">
        <label>Select Patient</label>
        <select
          className="form-select"
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
        >
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border p-3 mb-3 rounded" style={{ height: 300, overflowY: "auto" }}>
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.senderId === Number(doctorId) ? "text-end" : "text-start"}`}
          >
            <span
              className={`badge bg-${
                msg.senderId === Number(doctorId) ? "info" : "secondary"
              }`}
            >
              {msg.message} <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          className="form-control"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-success" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithPatient;
