// backend/models/Feedback.js
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedback", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Feedback.associate = (models) => {
    models.User.hasMany(Feedback, { foreignKey: "patientId", as: "PatientFeedbacks" });
    models.User.hasMany(Feedback, { foreignKey: "doctorId", as: "DoctorFeedbacks" });
    Feedback.belongsTo(models.User, { foreignKey: "patientId", as: "Patient" });
    Feedback.belongsTo(models.User, { foreignKey: "doctorId", as: "Doctor" });
  };

  return Feedback;
};
