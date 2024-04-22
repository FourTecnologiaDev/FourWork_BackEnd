const express = require("express");
const router = express.Router();
const crud = require("../crud");
const hashPassword = require("../authenticate/cripto");
const { v4: uuidv4 } = require('uuid'); // Importe a função v4 do pacote uuid

router.post("/novoSuporte", async function (req, res) {
  try {
    let plainPassword = req.body.password;
    const hash = await hashPassword(plainPassword);
    req.body.password = hash;
    
    // Cria um userId único usando o pacote uuid
    const userId = uuidv4();
    req.body.userId = userId; // Adiciona o userId ao corpo da requisição

    console.log("Senha Hash:", hash);
    console.log("UserID gerado:", userId); // Exibe o userId gerado
    console.log("Dados do usuário:", req.body); // Verifica os dados do usuário antes de inserir no banco de dados
    
    retorno = await crud("SuporteUsuario", req.body, "newUser");
    console.log("Retorno do CRUD:", retorno); // Verifica o retorno do CRUD
    res.send(retorno).end();
  } catch (err) {
    console.error("Erro ao criar usuário:", err); // Registra o erro no console
    res
      .status(500)
      .json({ retorno: `Algo deu errado!, erro: ${err}` })
      .end();
  }
});

module.exports = router;
