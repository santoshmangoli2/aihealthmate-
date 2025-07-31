const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadPrescription } = require("../controllers/prescriptionController");

router.post("/upload", upload.single("file"), uploadPrescription);

module.exports = router;
