// controllers/symptomController.js

const submitSymptom = async (req, res) => {
  try {
    const { symptoms } = req.body;
    // You can store symptoms in DB if needed
    res.status(201).json({ message: "Symptoms submitted successfully", symptoms });
  } catch (error) {
    console.error("Submit symptom error:", error.message);
    res.status(500).json({ error: "Failed to submit symptoms" });
  }
};

const getSymptoms = async (req, res) => {
  try {
    // If you're storing symptoms in DB, fetch them here
    res.status(200).json({ message: "Fetched symptoms successfully", data: [] });
  } catch (error) {
    console.error("Get symptoms error:", error.message);
    res.status(500).json({ error: "Failed to fetch symptoms" });
  }
};

module.exports = {
  submitSymptom,
  getSymptoms,
};
