const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("Users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Exportar Modelo
module.exports = User;
