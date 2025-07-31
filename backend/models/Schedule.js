module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define("Schedule", {
    day: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.User, { foreignKey: "doctorId" });
  };

  return Schedule;
};
