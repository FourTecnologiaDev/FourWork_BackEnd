const express = require("express");
const router = express.Router();
const multer = require('multer');
const fileXlsx = require("../Importacao/excelImp");

const storage = multer.memoryStorage();
const upload = multer();
router.post('/importar', upload.any(), async function (req, res) {
  try{
    const file = req.files && req.files[0] ? req.files[0].buffer : '';
    const inicio = parseInt(req.body.inicio);
    const table = req.body.table;
    retorno = await fileXlsx(file, inicio, table);
    res.send(retorno).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
});

module.exports = router