const express = require("express")
const router = express.Router()
const expPdf = require("../Exportacao/pdfExp");

router.post("/exportarPdf",  async (req, res) => {
  try{
    const body = req.body
    retorno =  await expPdf(req, res);
    //res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Export.pdf');
    res.send(retorno).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
});

module.exports = router