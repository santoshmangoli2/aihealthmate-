const { User, Appointment } = require("../models");

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({ where: { role: "doctor" } });
    res.json(doctors);
  } catch (err) {
    console.error("Error fetching doctors:", err);
    res.status(500).json({ error: "Failed to fetch doctors." });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findByPk(req.params.id);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ error: "Doctor not found." });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Get patients linked to a doctor via appointments
exports.getPatientsForDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [
        {
          model: User,
          as: "Patient", // uses alias from models/index.js
          attributes: ["id", "name", "email"],
        },
      ],
    });

    const uniquePatients = Array.from(
      new Map(appointments.map(a => [a.Patient.id, a.Patient])).values()
    );

    res.json(uniquePatients);
  } catch (err) {
    console.error("Error fetching patients for doctor:", err);
    res.status(500).json({ error: "Failed to retrieve patients." });
  }
};
