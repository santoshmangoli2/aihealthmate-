const PDFDocument = require("pdfkit");
const { User, Appointment, Feedback } = require("../models");

exports.downloadDoctorPatientReport = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Fetch patients with appointments
    const appointments = await Appointment.findAll({
      where: { doctorId },
      include: [{ model: User, as: "Patient", attributes: ["fullName", "email"] }],
    });

    // Group by patient
    const patientMap = new Map();

    appointments.forEach((a) => {
      const patientId = a.Patient.id;
      if (!patientMap.has(patientId)) {
        patientMap.set(patientId, {
          name: a.Patient.fullName,
          email: a.Patient.email,
          visits: 1,
        });
      } else {
        patientMap.get(patientId).visits++;
      }
    });

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=patient_report.pdf");
    doc.pipe(res);

    doc.fontSize(20).text("Patient Report Summary", { align: "center" });
    doc.moveDown();

    let index = 1;
    patientMap.forEach((data) => {
      doc
        .fontSize(12)
        .text(
          `${index++}. Name: ${data.name}\n   Email: ${data.email}\n   Visits: ${data.visits}\n`
        )
        .moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    console.error("Failed to generate report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
};
