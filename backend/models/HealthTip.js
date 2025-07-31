module.exports = (sequelize, DataTypes) => {
  const HealthTip = sequelize.define("HealthTip", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return HealthTip;
};
