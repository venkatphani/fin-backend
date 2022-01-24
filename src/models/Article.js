const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Article = sequelize.define("article", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Article;
};
