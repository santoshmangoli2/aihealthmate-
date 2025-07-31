const { HealthTip } = require("../models");

exports.getHealthTips = async (req, res) => {
  try {
    const tips = await HealthTip.findAll();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addHealthTip = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTip = await HealthTip.create({ title, description });
    res.status(201).json(newTip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
