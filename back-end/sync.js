const sequelize = require("./db");
require('./model/User')

const syncDB = async () => {
  try {
    // Sincroniza o banco de dados.
    await sequelize.sync({ force: true });
  } catch (error) {
    console.log("ERROR", error);
  }
};

syncDB();
