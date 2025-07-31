// backend/routes/reportRoutes.js
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
  uploadReport,
  getAllReports,
  getUserReports,
  deleteReport,
} = require("../controllers/reportController");

// Patient uploads a report
router.post("/upload", protect, upload.single("file"), uploadReport);

// Doctor or patient views all reports (filtered by role in controller)
router.get("/", protect, getAllReports);

// Patient views their own reports
router.get("/my", protect, getUserReports);

// Delete a report
router.delete("/:id", protect, deleteReport);

module.exports = router;
