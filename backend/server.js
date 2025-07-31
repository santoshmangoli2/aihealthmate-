// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const os = require("os");
const { errorHandler } = require("./middleware/errorMiddleware");
const { sequelize } = require("./models");

const app = express();

// 🌐 Utility to get Local IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// 🛡️ Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // 📂 Serve uploads

// 🔗 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/tips", require("./routes/healthTipsRoutes"));
app.use("/api/emergency", require("./routes/emergencyRoutes"));
app.use("/api/symptoms", require("./routes/symptomRoutes"));
app.use("/api", require("./routes/test"));
app.use("/api/refills", require("./routes/refillRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🚀 AIHealthMate API is running");
});

app.use(errorHandler);

// 🚀 Server
const PORT = process.env.PORT || 5000;
const IP = getLocalIP();

sequelize
  .sync({ alter: true })
  .then(() => {
    const time = new Date().toLocaleString();
    console.log(`✅ Connected to DB at ${time}`);
    console.log(`✅ Backend running at:`);
    console.log(`➡️  http://localhost:${PORT}`);
    console.log(`➡️  http://${IP}:${PORT} (from other devices)`);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🌐 Listening on 0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
  });
