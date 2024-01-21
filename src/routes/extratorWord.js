const express = require("express");
const router = express.Router();
const multer = require("multer");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();
let retorno;

const storage = multer.memoryStorage();
const upload = multer();
router.post("/extratorWord", upload.any(), async function (req, res) {
  try {
    const file = req.files && req.files[0] ? req.files[0].buffer : "";
    const extracted = extractor.extract(file);
    extracted.then(function (file) {
      console.log(file.getBody());
      retorno = file.getBody();
      res.send(retorno).end(); 
    });  
  } catch (err) {
    res
      .status(500)
      .json({ retorno: `Algo deu errado!, erro: ${err}` })
      .end();
  }
});

module.exports = router;
