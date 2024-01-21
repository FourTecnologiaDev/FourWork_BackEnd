const express = require("express")
const router = express.Router()

 router.use(bodyParser.json());
 router.use(bodyParser.text({ type: '*/*' }));
 router.post(`/mascarar`, async function (req, res) {
   try{
     retorno = await crud('participantes', req.body, 'mascarar');
     res.send(retorno).end();
   }
   catch(err){
     res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
   }
 })   

 module.exports = router