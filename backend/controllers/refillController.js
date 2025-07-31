const { RefillRequest, User } = require("../models");

// 📌 Create a new refill request (patient)
exports.createRefillRequest = async (req, res) => {
  try {
    const { doctorId, medication, dosage, note } = req.body;

    const refill = await RefillRequest.create({
      patientId: req.user.id,
      doctorId,
      medication,
      dosage,
      note,
    });

    res.status(201).json(refill);
  } catch (error) {
    res.status(500).json({ message: "Failed to create refill request", error });
  }
};

// 📌 Get all refill requests for a patient
exports.getPatientRefills = async (req, res) => {
  try {
    const refills = await RefillRequest.findAll({
      where: { patientId: req.user.id },
      include: [{ model: User, as: "Doctor", attributes: ["name", "email"] }],
    });

    res.status(200).json(refills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch refills", error });
  }
};

// 📌 Get all refill requests for a doctor
exports.getDoctorRefills = async (req, res) => {
  try {
    const refills = await RefillRequest.findAll({
      where: { doctorId: req.user.id },
      include: [{ model: User, as: "Patient", attributes: ["name", "email"] }],
    });

    res.status(200).json(refills);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctor refills", error });
  }
};

// 📌 Approve/Reject a request (doctor)
exports.updateRefillStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const refill = await RefillRequest.findByPk(id);
    if (!refill) return res.status(404).json({ message: "Refill not found" });

    refill.status = status;
    refill.note = note;
    await refill.save();

    res.status(200).json(refill);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};
