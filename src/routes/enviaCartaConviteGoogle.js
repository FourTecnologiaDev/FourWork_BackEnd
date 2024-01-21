const express = require("express")
const router = express.Router()
const enviarEmailGoogle = require("../envioEmail/enviaEmailGoogle");

router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));
router.post(`/enviarCartaConviteGoogle`, async function (req, res) {
  try{
    retorno = await enviarEmailGoogle();
    res.send(retorno).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
})  

module.exports = router