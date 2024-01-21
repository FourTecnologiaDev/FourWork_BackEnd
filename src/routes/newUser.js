const express = require("express");
const router = express.Router();
const crud = require("../crud");
const hashPassword = require("../authenticate/cripto");

router.post("/novoUsuario", async function (req, res) {
  try {
    let plainPassword = req.body.password;
    const hash = await hashPassword(plainPassword);
    req.body.password = hash;
    console.log("Senha Hash:", hash);

    retorno = await crud("login", req.body, "newUser");
    res.send(retorno).end();
  } catch (err) {
    res
      .status(500)
      .json({ retorno: `Algo deu errado!, erro: ${err}` })
      .end();
  }
});

module.exports = router;
