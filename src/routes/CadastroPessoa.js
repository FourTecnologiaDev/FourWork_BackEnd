const express = require('express');
const router = express.Router();
const cors = require('cors');
const crud = require("../crud");
const hashPassword = require("../authenticate/cripto");

router.use(cors());

router
  .post('/cadPessoa', async (req, res) => {
    const { tipoPessoaSelecionado, ...outrasInformacoes } = req.body;
    
    try {
      await crud('cadastrousuario', outrasInformacoes, 'insert');
      res.json({ resultado: "Inserido com sucesso." }).end();
  
    } catch (err) {
      res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
    }

    try {
      let plainPassword = req.body.password;
      const hash = await hashPassword(plainPassword);
      req.body.password = hash;
      console.log("Senha Hash:", hash);
  
      retorno = await crud("cadastrousuario", req.body, "newUser");
      res.send(retorno).end();
    } catch (err) {
      res
        .status(500)
        .json({ retorno: `Algo deu errado!, erro: ${err}` })
        .end();
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
