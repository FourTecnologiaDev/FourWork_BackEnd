const express = require("express")
const router = express.Router()
const gerarModelo = require("../Exportacao/gerarModelo");

router.use(express.json()); 
router.post("/exportarModelo",  async (req, res) => {
  try{
    const body = req.body
    retorno = await gerarModelo(req, res);
    res.contentType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=arquivo.xlsx');
    res.send(retorno).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
});

module.exports = router