module.exports = (sequelize, DataTypes) => {
  const PatientRecord = sequelize.define("PatientRecord", {
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    medicalHistory: { type: DataTypes.TEXT },
  });

  PatientRecord.associate = (models) => {
    PatientRecord.belongsTo(models.User, { foreignKey: "patientId" });
  };

  return PatientRecord;
};
