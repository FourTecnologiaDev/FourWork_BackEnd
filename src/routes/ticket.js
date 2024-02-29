const express = require('express');
const router = express.Router();
const Ticket = require('../schema/tabela'); // Importe o modelo de ticket
const crud = require("../crud");

// Rota para criar um novo ticket
router.post('/ticket', async (req, res) => {
  try {
    // Cria um novo ticket usando os dados recebidos no corpo da requisição
    const newTicket = new Ticket(req.body);
    
    // Salva o novo ticket no banco de dados
    await newTicket.save();

    // Executa a função crud para operações adicionais
    await crud("tabela", req.body, "ticket");

    // Responde com o ticket criado e um status 201 (Created)
    res.status(201).json(newTicket);
  } catch (error) {
    // Em caso de erro, loga o erro e responde com um status 500 (Internal Server Error)
    console.error('Erro ao criar ticket:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
