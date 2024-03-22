const express = require("express")
const router = express.Router()
const enviarEmailMicrosoft = require("../envioEmail/enviaEmailMicrosoft")

router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' }));
router.post(`/enviarCartaConviteMicrosoft`, async function (req, res) {
  try{
    const retEmail = await enviarEmailMicrosoft(req.body.emails, req.body.tipo);        
    res.status(retEmail.status).send(retEmail.message).end();

  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }

})  

module.exports = router