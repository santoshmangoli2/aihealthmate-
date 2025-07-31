const express = require("express");
const router = express.Router();
const symptomController = require("../controllers/symptomController");
const { protect } = require("../middleware/authMiddleware");
const { getSymptomAnalysis } = require("../utils/gemini"); // ✅ add this

// Existing routes
router.post("/", protect, symptomController.submitSymptom);
router.get("/all", protect, symptomController.getSymptoms);

// ✅ Gemini AI analysis route (unprotected for now, or protect if needed)
router.post("/analyze", async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms are required" });
  }

  try {
    const diagnosis = await getSymptomAnalysis(symptoms);
    res.json({ diagnosis });
  } catch (error) {
    console.error("Gemini error:", error.message);
    res.status(500).json({ error: "Gemini AI failed to analyze symptoms" });
  }
});

module.exports = router;
