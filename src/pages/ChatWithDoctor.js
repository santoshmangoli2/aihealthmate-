// src/pages/ChatWithDoctor.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatWithDoctor = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const patientId = localStorage.getItem("userId");

  // ✅ Fetch all doctors on mount
  useEffect(() => {
    axios
      .get("/api/doctors")
      .then((res) => {
        setDoctors(res.data);
        if (res.data.length > 0) setSelectedDoctorId(res.data[0].id);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  // ✅ Fetch messages
  useEffect(() => {
    if (!patientId || !selectedDoctorId) return;
    axios
      .get(`/api/chat?senderId=${patientId}&receiverId=${selectedDoctorId}`)
      .then((res) => setChat(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, [selectedDoctorId, patientId]);

  // ✅ Send message
  const sendMessage = () => {
    if (!message.trim()) return;
    axios
      .post("/api/chat", {
        message,
        senderId: patientId,
        receiverId: selectedDoctorId,
      })
      .then(() => {
        setMessage("");
        return axios.get(`/api/chat?senderId=${patientId}&receiverId=${selectedDoctorId}`);
      })
      .then((res) => setChat(res.data))
      .catch((err) => console.error("Failed to send message:", err));
  };

  return (
    <div className="container py-4">
      <h3 className="text-center mb-3 text-primary">💬 Chat with Doctor</h3>

      <div className="mb-3">
        <label>Select a Doctor</label>
        <select
          className="form-select"
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
        >
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border p-3 mb-3 rounded" style={{ height: 300, overflowY: "auto" }}>
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.senderId === Number(patientId) ? "text-end" : "text-start"}`}
          >
            <span
              className={`badge bg-${msg.senderId === Number(patientId) ? "success" : "secondary"}`}
            >
              {msg.message}{" "}
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
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
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWithDoctor;
