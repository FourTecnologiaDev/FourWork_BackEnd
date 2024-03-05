const express = require('express');
const router = express.Router();
const Ticket = require('../schema/tabela'); // Importe o modelo de ticket
const crud = require("../crud");

router.
    post(`/ticket`, async function (req, res) {
      try{
        retorno = await crud('tabela', req.body, 'lastCode');
        if (retorno.length > 0)
          req.body.codigo = retorno[0].codigo + 1;
        else
          req.body.codigo = 1;
        await crud('tabela', req.body, 'insert');
        res.json({resultado: "Inserido com sucesso."}).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
    .get(`/ticket`, async function (req, res) {
      try{
        retorno = await crud('tabela', {}, 'find');
        res.json(retorno).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    });
  
  module.exports = router;
