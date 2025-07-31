const express = require("express");
const router = express.Router();
const healthTipsController = require("../controllers/healthTipsController");

// Note: Must match the exported name in controller
router.get("/", healthTipsController.getHealthTips);
router.post("/", healthTipsController.addHealthTip);

module.exports = router;
