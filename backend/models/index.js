// models/index.js
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

// ✅ Use Railway DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 1) Import all models
db.User           = require("./User")(sequelize, DataTypes);
db.Appointment    = require("./Appointment")(sequelize, DataTypes);
db.Emergency      = require("./Emergency")(sequelize, DataTypes);
db.ChatMessage    = require("./ChatMessage")(sequelize, DataTypes);
db.Feedback       = require("./Feedback")(sequelize, DataTypes);
db.RefillRequest  = require("./RefillRequest")(sequelize, DataTypes);
db.Prescription   = require("./Prescription")(sequelize, DataTypes);
db.Report         = require("./Report")(sequelize, DataTypes);

// 2) Associate models if needed
Object.values(db)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(db));

module.exports = db;
