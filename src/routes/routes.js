const express = require("express");
const router = express.Router();
bodyParser = require('body-parser');
const authenticateToken = require('../authenticate/authenticateToken')
const autenticacao = require('./autenticacao')
const gestaoatv = require('./GestaoAtv')
const authorizedUsers = require('./authorizedUser')
const cadastroRAT = require('./RAT')
const nextCode = require('./nextCode')
const cadPessoa = require('./CadastroPessoa')

router.use(bodyParser.json());

router.route('/autenticacao').post(autenticacao)
router.route('/gestaoatv').all(authenticateToken, gestaoatv)
router.route('/gestaoatv/:id').delete(authenticateToken, gestaoatv)
router.route('/authorizedUsers').all(authenticateToken, authorizedUsers)
router.route('/rats').all(authenticateToken, cadastroRAT)
router.route('/ratsdowloadpdf').post(authenticateToken, cadastroRAT)
router.route('/nextCode').get(authenticateToken, nextCode)
router.route('/cadPessoa').all(authenticateToken, cadPessoa)
router.route('/cadPessoa/:tipoPessoa').get(authenticateToken, cadPessoa)
router.route('/gestaoatv/:codigoRAT').get(authenticateToken, gestaoatv)


router.use(express.json())

module.exports = router;


// const fileCsv = require("../Importacao/csvImp");
// const envMsg = require('../whatsapp/sendMsg') 
// const receivedMsg = require('../whatsapp/receivedMsg')
/**
* Rota para whats - teste
*/

/*router.post(`/whatsMensagem`, async function (req, res) {
  try{    
    retorno = await envMsg(req.body.destino, req.body.mensagem);
    res.status(retorno.status).json(retorno.data).end();
  }
  catch(err){
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }
})*/
