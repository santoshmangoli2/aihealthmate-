// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  submitFeedback,      // POST /api/feedback
  getDoctorFeedbacks,  // GET /api/feedback/doctor/:id
} = require("../controllers/feedbackController");

router.post("/", protect, submitFeedback);
router.get("/doctor/:id", protect, getDoctorFeedbacks);

module.exports = router;
