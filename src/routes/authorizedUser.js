const express = require('express');
const router = express.Router();

// Lista de usuários autorizados
const authorizedUsers = ['usuario1@example.com', 'usuario2@example.com', 'usuario3@example.com'];

// Rota para fornecer a lista de usuários autorizados
router.get('/authorizedUsers', (req, res) => {
  res.json(authorizedUsers);
});

module.exports = router;