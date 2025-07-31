const express = require("express");
const router = express.Router();
const {
  createRefillRequest,
  getPatientRefills,
  getDoctorRefills,
  updateRefillStatus,
} = require("../controllers/refillController");

const { protect, restrictTo } = require("../middleware/authMiddleware");

// Patient creates request
router.post("/", protect, restrictTo("patient"), createRefillRequest);

// Patient views own refills
router.get("/my", protect, restrictTo("patient"), getPatientRefills);

// Doctor views requests
router.get("/doctor", protect, restrictTo("doctor"), getDoctorRefills);

// Doctor updates status
router.put("/:id", protect, restrictTo("doctor"), updateRefillStatus);

module.exports = router;
