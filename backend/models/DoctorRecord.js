module.exports = (sequelize, DataTypes) => {
  const DoctorRecord = sequelize.define("DoctorRecord", {
    specialization: { type: DataTypes.STRING, allowNull: false },
    experience: { type: DataTypes.INTEGER },
    qualifications: { type: DataTypes.STRING },
  });

  DoctorRecord.associate = (models) => {
    DoctorRecord.belongsTo(models.User, { foreignKey: "doctorId" });
  };

  return DoctorRecord;
};
