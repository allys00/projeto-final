const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Event = sequelize.define("Events", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Exportar Modelo
module.exports = Event;
