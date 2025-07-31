const express = require("express");
const router = express.Router();
const emergencyController = require("../controllers/emergencyController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, emergencyController.submitEmergency);
router.get("/all", protect, emergencyController.getEmergencies);

module.exports = router;
