const { Appointment, User } = require("../models");

// 📅 Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { date, time, doctorId, reason } = req.body;
    const patientId = req.user.id; // Extracted from token middleware if present

    const doctor = await User.findByPk(doctorId);
    const patient = await User.findByPk(patientId);

    const appointment = await Appointment.create({
      date,
      time,
      reason,
      doctorId,
      patientId,
      doctorName: doctor?.name,
      patientName: patient?.name,
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ error: "Appointment booking failed." });
  }
};

// 👨‍⚕️ Get appointments for a doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findAll({ where: { doctorId: id } });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching doctor appointments." });
  }
};

// 👤 Get appointments for a patient
exports.getPatientAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const appointments = await Appointment.findAll({ where: { patientId: id } });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching patient appointments." });
  }
};
