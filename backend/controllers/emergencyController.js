const { Emergency } = require("../models");

exports.submitEmergency = async (req, res) => {
  try {
    const { location, description } = req.body;
    const emergency = await Emergency.create({
      location,
      description,
      userId: req.user.id
    });
    res.status(201).json(emergency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.findAll({ where: { userId: req.user.id } });
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
