const express = require('express');
const router = express.Router();
const Finalizado = require('../schema/finalizado'); // Importe o modelo de ticket
const crud = require("../crud");

router.
    post(`/finalizados`, async function (req, res) {
      try{
        retorno = await crud('finalizado', req.body, 'lastCode');
        if (retorno.length > 0)
          req.body.codigo = retorno[0].codigo + 1;
        else
          req.body.codigo = 1;
        await crud('finalizado', req.body, 'insert');
        res.json({resultado: "Inserido com sucesso."}).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
    .get(`/finalizados`, async function (req, res) {
      try{
        retorno = await crud('finalizado', {}, 'find');
        res.json(retorno).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })

module.exports = router;
