const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 1) Import all models
db.User           = require("./User")(sequelize, DataTypes);
db.Appointment    = require("./Appointment")(sequelize, DataTypes);
db.Emergency      = require("./Emergency")(sequelize, DataTypes);
db.ChatMessage    = require("./ChatMessage")(sequelize, DataTypes);
db.Feedback       = require("./Feedback")(sequelize, DataTypes);
db.RefillRequest  = require("./RefillRequest")(sequelize, DataTypes); // ✅ ADDED
db.Prescription = require("./Prescription")(sequelize, DataTypes);
db.Report = require("./Report")(sequelize, DataTypes);



// 2) Call associate on each if defined
Object.values(db)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(db));

module.exports = db;
