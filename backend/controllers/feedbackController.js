// controllers/feedbackController.js
const { Feedback, User } = require("../models");

exports.submitFeedback = async (req, res) => {
  try {
    const { patientId, doctorId, rating, comment } = req.body;
    const fb = await Feedback.create({ patientId, doctorId, rating, comment });
    res.status(201).json(fb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDoctorFeedbacks = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const feedbacks = await Feedback.findAll({
      where: { doctorId },
      include: [{ model: User, as: "Patient", attributes: ["id","name"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
