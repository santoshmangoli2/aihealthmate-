// backend/middleware/authMiddleware.js
exports.protect = async (req, res, next) => {
  try {
    // Simulate authentication for now (replace with JWT check later)
    req.user = { id: 1, role: "patient" }; // Replace this with actual decoded token
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
