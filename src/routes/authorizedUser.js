const express = require('express');
const router = express.Router();

// Lista de usuários autorizados
const authorizedUsers = ['pedro.freitas@fourtc.com.br'];

// Rota para fornecer a lista de usuários autorizados
router.get('/authorizedUsers', (req, res) => {
  res.json(authorizedUsers);
});

module.exports = router;