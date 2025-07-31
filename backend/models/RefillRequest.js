module.exports = (sequelize, DataTypes) => {
  const RefillRequest = sequelize.define("RefillRequest", {
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dosage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  RefillRequest.associate = (models) => {
    models.User.hasMany(RefillRequest, { foreignKey: "patientId", as: "RefillRequests" });
    models.User.hasMany(RefillRequest, { foreignKey: "doctorId", as: "RefillApprovals" });

    RefillRequest.belongsTo(models.User, { foreignKey: "patientId", as: "Patient" });
    RefillRequest.belongsTo(models.User, { foreignKey: "doctorId", as: "Doctor" });
  };

  return RefillRequest;
};
