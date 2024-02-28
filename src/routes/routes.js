const express = require("express");
const router = express.Router();
bodyParser = require('body-parser');
const authenticateToken = require('../authenticate/authenticateToken')
const autenticacao = require('./autenticacao')
const novoUsuario = require('./newUser')
const webhook = require('./webhook')
const participantes = require('./participantes')
const importar = require('./importar')
const cartaConvite = require('./cartaConvite')
const exportar = require('./exportar')
const exportarModelo = require('./exportarModelo')
const mascarar = require('./mascarar')
const enviaCartaConviteGoogle = require('./enviaCartaConviteGoogle')
const enviaCartaConviteMicrosoft = require('./enviaCartaConviteMicrosoft')
const enviarCartaConvite = require('./enviarCartaConvite')
const rotasSimples = require('./rotasSimples')
const extratorWord = require('./extratorWord')
const sendWhats = require('./sendWhats')
const sendTemplate = require('./sendWhatsTemplate')
const exportarPdf = require('./exportarPDF')
const ticket = require('./ticket')

router.use(bodyParser.json());

router.route('/autenticacao').post(autenticacao)
router.route('/novoUsuario').post(authenticateToken, novoUsuario)
router.route('/pesquisar').post(authenticateToken, novoUsuario)
router.route('/webhook').post(webhook)
router.route('/importar').post(authenticateToken, importar)
router.route('/participantes').all(authenticateToken, participantes)
router.route('/pesquisarParticipantes').all(authenticateToken ,participantes)
router.route('/cartaConvite').all(authenticateToken, cartaConvite)
router.route('/pesquisarCartaConvite').all(authenticateToken, cartaConvite)
router.route('/exportar').post(authenticateToken, exportar)
router.route('/exportarModelo').post(authenticateToken, exportarModelo)
router.route('/mascarar').post(authenticateToken, mascarar)
router.route('/enviarCartaConviteGoogle').post(authenticateToken, enviaCartaConviteGoogle)
router.route('/enviarCartaConviteMicrosoft').post(authenticateToken, enviaCartaConviteMicrosoft)
router.route('/enviarCartaConvite').all(authenticateToken, enviarCartaConvite)
router.route('/clientes').all(authenticateToken, rotasSimples)
router.route('/empresas').all(authenticateToken, rotasSimples)
router.route('/fornecedores').all(authenticateToken, rotasSimples)
router.route('/eventos').all(authenticateToken, rotasSimples)
router.route('/servicos').all(authenticateToken, rotasSimples)
router.route('/tipo_evento').all(authenticateToken, rotasSimples)
router.route('/dadosCadastrais').all(authenticateToken, rotasSimples)
router.route('/questionario').all(authenticateToken, rotasSimples)
router.route('/robo').all(authenticateToken, rotasSimples)
router.route('/dadosCadastraisParticipantes').all(authenticateToken, rotasSimples)
router.route('/pesquisarClientes').all(authenticateToken, rotasSimples)
router.route('/pesquisarEmpresas').all(authenticateToken, rotasSimples)
router.route('/pesquisarFornecedores').all(authenticateToken, rotasSimples)
router.route('/pesquisarEventos').all(authenticateToken, rotasSimples)
router.route('/pesquisarServicos').all(authenticateToken, rotasSimples)
router.route('/pesquisarTipo_evento').all(authenticateToken, rotasSimples)
router.route('/pesquisarDadosCadastrais').all(authenticateToken, rotasSimples)
router.route('/pesquisarQuestionario').all(authenticateToken, rotasSimples)
router.route('/pesquisarGestaoParticipantes').all(authenticateToken,rotasSimples)
router.route('/pesquisarRobo').all(authenticateToken, rotasSimples)
router.route('/pesquisarDadosCadastraisParticipantes').all(authenticateToken, rotasSimples)
router.route('/login').all(authenticateToken, rotasSimples)
router.route('/pesquisarLogin').all(authenticateToken, rotasSimples)
router.route('/extratorWord').all(authenticateToken, extratorWord)
router.route('/sendWhats').post(authenticateToken, sendWhats)
router.route('/sendTemplate').post(authenticateToken, sendTemplate)
router.route('/exportarPDF').post(authenticateToken, exportarPdf)
router.route('/ticket').post(ticket)

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
