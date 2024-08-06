const express = require("express");
const sequelize = require("./db");
const cors = require('cors');
const User = require("./model/User");

const corsOptions = {
  origin: "*",
}

const app = express();

app.use(express.json());
app.use(cors(corsOptions))

// Porta da base URL
const port = 3000;
// Sincronizar o Banco de dados DB = Database = Banco de dados.

// Criar usuário
app.post('/user', async (req, res) => {
  try {
    // {name: "Andre", email: "andre@gmail.com", senha: "123456"}
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email, password } })
    if (user) {
      const userWithouPassword = user.toJSON()
      delete userWithouPassword.password
      res.status(200).json({ user: userWithouPassword })
    } else {
      res.status(401).json({ error: 'Usuário não encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

sequelize.sync().then(() => {
  // Rodar o servidor para ficar escutando as chamadas ao endpoint
  app.listen(port, () => {
    console.log("Servidor Rodando na url http://localhost:" + port);
  });
});
