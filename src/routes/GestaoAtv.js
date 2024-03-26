const express = require('express');
const router = express.Router();
const cors = require('cors');
const CadastroPessoa = require('../schema/cadPessoa')(); // Importe o modelo e chame a função para obter o modelo
const crud = require("../crud");

router.use(cors());

router.post(`/gestaoatv`, async function (req, res) {
  try {
    const retorno = await crud('cadPessoa', req.body, 'lastCode');

    await crud('cadPessoa', req.body, 'insert');
    res.json({ resultado: "Inserido com sucesso." }).end();
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
})

.get(`/gestaoatv`, async function (req, res) {
  try {
    const retorno = await crud('cadPessoa', {}, 'find');
    res.json(retorno).end();
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

module.exports = router;
