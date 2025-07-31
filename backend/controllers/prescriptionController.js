// backend/controllers/prescriptionController.js
const path = require("path");

exports.uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // You can optionally save the file info to DB here
    return res.status(201).json({
      message: "File uploaded successfully",
      fileUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
};
