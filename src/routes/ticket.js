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
    })
    .delete('/ticket/:id', async function (req, res) {
      const ticketId = req.params.id;
  
      try {
        // Encontre o ticket pelo ID e remova-o da tabela, mas não exclua do banco de dados
        const ticket = await Ticket.findByIdAndRemove(ticketId);
  
        // Se o ticket não for encontrado, retorne um erro 404
        if (!ticket) {
          return res.status(404).json({ error: 'Ticket não encontrado' });
        }
  
        // Responda com uma mensagem de sucesso
        res.json({ message: 'Ticket removido da tabela com sucesso' });
      } catch (err) {
        // Se ocorrer um erro, retorne um erro 500 com detalhes do erro
        res.status(500).json({ error: `Erro ao remover o ticket da tabela: ${err.message}` });
      }
    });
  
  module.exports = router;
