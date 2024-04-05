const express = require('express');
const router = express.Router();
const CadastroRAT = require('../schema/cadRat')(); // Importe o modelo e chame a função para obter o modelo

// Rota para obter o próximo código incremental
router.get('/nextCode', async (req, res) => {
  try {
    const nextCode = await getNextCode();
    res.json({ nextCode }).end();
  } catch (error) {
    res.status(500).json({ error: `Erro ao obter próximo código: ${error.message}` }).end();
  }
});

// Função para obter o próximo código incremental
async function getNextCode() {
  try {
    const lastRAT = await CadastroRAT.findOne().sort({ codigo: -1 }).limit(1);
    if (!lastRAT) return 'F00001'; // Se não houver nenhum registro, comece com F00001
    const lastCode = lastRAT.codigo;
    const lastNumber = parseInt(lastCode.slice(1), 10);
    const nextNumber = lastNumber + 1;
    return 'F' + nextNumber.toString().padStart(5, '0'); // Formata o próximo código com zero à esquerda
  } catch (error) {
    throw new Error(`Erro ao obter próximo código: ${error}`);
  }
}

module.exports = router;