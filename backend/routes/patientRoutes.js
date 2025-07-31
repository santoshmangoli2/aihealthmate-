const express = require("express");
const router = express.Router();
const { getPatients } = require("../controllers/patientController");

// Make sure getPatients is defined in the controller!
router.get("/", getPatients);

module.exports = router;
