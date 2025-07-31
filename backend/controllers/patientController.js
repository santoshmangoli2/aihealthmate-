// controllers/patientController.js
const { User } = require("../models");

exports.getPatients = async (req, res) => {
  try {
    const patients = await User.findAll({ where: { role: "patient" } });
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients." });
  }
};
