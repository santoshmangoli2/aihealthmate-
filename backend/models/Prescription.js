module.exports = (sequelize, DataTypes) => {
  const Prescription = sequelize.define("Prescription", {
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Prescription.associate = (models) => {
    Prescription.belongsTo(models.User, { foreignKey: "patientId", as: "Patient" });
    Prescription.belongsTo(models.User, { foreignKey: "doctorId", as: "Doctor" });
  };

  return Prescription;
};
