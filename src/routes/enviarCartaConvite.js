const express = require("express")
const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));
router.post(`/enviarCartaConvite`, async function (req, res) {
  try{
    retorno = await enviarEmail(req.body);
    res.send(retorno).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
})  

module.exports = router