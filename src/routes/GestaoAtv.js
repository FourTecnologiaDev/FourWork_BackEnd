const express = require('express');
const router = express.Router();
const CadastroPessoa = require('../schema/cadPessoa')(); // Importe o modelo e chame a função para obter o modelo
const crud = require("../crud");

router
  .post(`/gestaoatv`, async function (req, res) {
    try {
      const retorno = await crud('cadPessoa', req.body, 'lastCode');
      if (retorno.length > 0)
        req.body.codigo = retorno[0].codigo + 1;
      else
        req.body.codigo = 1;
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