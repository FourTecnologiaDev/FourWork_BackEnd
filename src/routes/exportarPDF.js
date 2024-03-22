const express = require("express");
const router = express.Router();
const expPdf = require("../Exportacao/pdfExp");

router.post("/exportarPdf", async (req, res) => {
  try {
    // Define os headers para o PDF
    res.setHeader("Content-Disposition", "attachment; filename=Export.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Chama a função que gera o PDF
    await expPdf(req, res);
  } catch (err) {
    // Se houver erro, envia uma resposta de erro
    res
      .status(500)
      .json({ retorno: `Algo deu errado!, erro: ${err}` })
      .end();
  }
});

module.exports = router;
