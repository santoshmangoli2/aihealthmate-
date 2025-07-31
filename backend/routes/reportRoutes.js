// backend/routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { Report } = require("../models");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { patientId, type, uploadedBy } = req.body;

    const newReport = await Report.create({
      filename: req.file.originalname,
      filepath: req.file.path,
      uploadedBy,
      patientId,
      type,
    });

    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
});

router.get("/:patientId", async (req, res) => {
  const { patientId } = req.params;
  const reports = await Report.findAll({ where: { patientId } });
  res.json(reports);
});

module.exports = router;
