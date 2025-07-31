module.exports = (sequelize, DataTypes) => {
  const Symptom = sequelize.define("Symptom", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Symptom;
};
