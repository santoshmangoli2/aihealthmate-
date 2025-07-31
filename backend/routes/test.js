const express = require("express");
const router = express.Router(); // ✅ THIS LINE IS MISSING IN YOUR CODE

router.get("/", (req, res) => {
  res.send("🚀 AIHealthMate API is working");
});

module.exports = router;
