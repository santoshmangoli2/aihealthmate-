const express = require("express");
const router = express.Router();
const { getAllDoctors, getDoctorById } = require("../controllers/doctorController");
const { Appointment, User } = require("../models");

// Route to get all doctors
router.get("/", getAllDoctors);

// Route to get doctor by ID
router.get("/:id", getDoctorById);

// ✅ Route to get unique patients that a doctor has appointments with
router.get("/:id/patients", async (req, res) => {
  const doctorId = req.params.id;

  try {
    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [{ model: User, as: "Patient", attributes: ["id", "name"] }],
    });

    const uniquePatients = Array.from(
      new Map(appointments.map((a) => [a.Patient.id, a.Patient])).values()
    );

    res.json(uniquePatients);
  } catch (err) {
    console.error("Error fetching patients for doctor:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
