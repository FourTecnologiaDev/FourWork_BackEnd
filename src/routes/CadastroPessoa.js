const express = require('express');
const router = express.Router();
const cors = require('cors');
const crud = require("../crud");
const hashPassword = require("../authenticate/cripto");

router.use(cors());

router
  .post('/cadPessoa', async (req, res) => {
    try {
      // Extrai as informações do corpo da solicitação
      const { tipoPessoaSelecionado, ...outrasInformacoes } = req.body;

      // Gera o hash da senha
      let plainPassword = req.body.password;
      const hash = await hashPassword(plainPassword);
      req.body.password = hash;
      console.log("Senha Hash:", hash);

      // Insere as informações do usuário no banco de dados
      await crud('cadastrousuario', req.body, 'insert');

      // Responde ao cliente com sucesso
      res.json({ resultado: "Inserido com sucesso." }).end();
    } catch (err) {
      // Se ocorrer algum erro, responde ao cliente com o status 500 e uma mensagem de erro
      res.status(500).json({ retorno: `Algo deu errado!, erro: ${err.message}` }).end();
    }
  })
  .get(`/cadPessoa`, async function (req, res) {
    try{
      const retorno = await crud('cadastrousuario', {}, 'find');
      res.json(retorno).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .get('/cadPessoa/:tipoPessoa', async (req, res) => {
    const { tipoPessoa } = req.params;
  
    try {
      const retorno = await crud('cadastrousuario', { TipoPessoa: tipoPessoa }, 'find');
      console.log('Retorno do banco de dados:', retorno);
      res.json(retorno).end();
    } catch (err) {
      res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
    }
  })
  .get('/cadPessoa/cliente', async (req, res) => {
    const { tipoPessoa } = req.params;
  
    try {
      const retorno = await crud('cadastrousuario', { TipoPessoa: tipoPessoa }, 'find');
      console.log('Retorno do banco de dados:', retorno);
      res.json(retorno).end();
    } catch (err) {
      res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
    }
  });


module.exports = router;
