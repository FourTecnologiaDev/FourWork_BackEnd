const express = require("express")
const router = express.Router()
const enviarEmailSuporte = require("../envioEmail/enviaEmailSuporte")

router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));
router.post(`/enviarEmail`, async function (req, res) {
  try{
    const retEmail = await enviarEmailSuporte(req.body);        

  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }

})  

module.exports = router