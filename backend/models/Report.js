// backend/models/Report.js
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.STRING,
      allowNull: false, // doctor id or name
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // e.g., 'x-ray', 'prescription'
    },
  });

  return Report;
};
