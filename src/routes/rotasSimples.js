const express = require("express")
const router = express.Router()

funcRotas('clientes');
funcRotas('empresas');
funcRotas('fornecedores');
funcRotas('eventos');
funcRotas('servicos');
funcRotas('tipo_evento');
funcRotas('dadosCadastrais');
funcRotas('questionario');
funcRotas('robo');
funcRotas('dadosCadastraisParticipantes')
funcRotas('login')

/**
 * Rotas para cadastro e pesquisa de usuarios
 */
router.use(bodyParser.json());
router.use(bodyParser.text({ type: '*/*' })); 
  
  /**
   * 
   * @param {*} rota - Nome da entidade
   */
function funcRotas(rota) {
  router.use(bodyParser.json());
  router.use(bodyParser.text({ type: '*/*' }));
  router.
    post(`/${rota}`, async function (req, res) {
      try{
        retorno = await crud(rota, req.body, 'lastCode');
        if (retorno.length > 0)
          req.body.codigo = retorno[0].codigo + 1;
        else
          req.body.codigo = 1;
        await crud(rota, req.body, 'insert');
        res.json({resultado: "Inserido com sucesso."}).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
    .put(`/${rota}`, async function (req, res) {
      try{
        await crud(rota, req.body, 'update');
        res.json({resultado: "Atualizado com sucesso."}).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
    .delete(`/${rota}`, async function (req, res) {
      try{
        if(req.body._id == undefined){
          err = `ID do registro não foi informado!`;
          res.status(500).json({retorno: `${err}`}).end();
        }
        else{
          await crud(rota, req.body, 'delete');
          res.json({resultado: "Excluido com sucesso."}).end();
        }
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
    .post(`/pesquisar${rota}`, async function (req, res) {
      try{
        retorno = await crud(rota, req.body, 'find');
        res.send(retorno).end();
      }
      catch(err){
        res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
      }
    })
}

module.exports = router