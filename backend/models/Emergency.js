module.exports = (sequelize, DataTypes) => {
  const Emergency = sequelize.define("Emergency", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isResolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Emergency;
};
