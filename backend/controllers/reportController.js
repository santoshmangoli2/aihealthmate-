// backend/controllers/reportController.js
exports.uploadReport = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save file details in DB if needed here

    res.status(201).json({
      message: "Report uploaded successfully",
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Stub other controllers for now
exports.getAllReports = async (req, res) => res.send("All reports");
exports.getUserReports = async (req, res) => res.send("User reports");
exports.deleteReport = async (req, res) => res.send("Report deleted");
