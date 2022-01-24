const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.sequelize = sequelize;

db.user = require("./User")(sequelize);
db.article = require("./Article")(sequelize);

module.exports = db;
