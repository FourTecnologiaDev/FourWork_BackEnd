const express = require('express');
const router = express.Router();
const Ticket = require('../schema/tabela'); // Importe o modelo de ticket
const crud = require("../crud");

// Rota para criar um novo ticket
router.post('/ticket', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body); // Crie um novo ticket usando os dados recebidos no corpo da requisição
    await newTicket.save(); // Salve o novo ticket no banco de dados

    // Executar a função crud
    const retorno = await crud("tabela", req.body, "ticket");

    res.status(201).json(newTicket); // Responda com o ticket criado e um status 201 (Created)
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    res.status(500).json({ message: 'Erro interno do servidor' }); // Responda com um status 500 (Internal Server Error) se ocorrer um erro
  }
});


module.exports = router;
