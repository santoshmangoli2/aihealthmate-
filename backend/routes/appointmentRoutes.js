const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getDoctorAppointments,
  getPatientAppointments,
} = require("../controllers/appointmentController");

// POST: Book an appointment
router.post("/", bookAppointment);

// GET: Appointments for patient
router.get("/patient/:id", getPatientAppointments);

// GET: Appointments for doctor
router.get("/doctor/:id", getDoctorAppointments);

module.exports = router;
