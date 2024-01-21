const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer();

router.post(`/pesquisarParticipantes`, async function (req, res) {
    try{
      retorno = await crud('participantes', req.body, 'find');
      res.json(retorno).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  
  router.put(`/participantes`, upload.any(), async function (req, res) {
    try{    
      const file = req.files && req.files[0] ? req.files[0].buffer : '';
      const body = JSON.parse(req.body.body);    
      body.copiaDocumento = file;
      await crud('participantes', body, 'update');
      res.json({resultado: "Atualizado com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  router.delete(`/participantes`, async function (req, res) {
    try{
      if(req.body._id == undefined){
        err = `ID do registro não foi informado!`;
        res.status(500).json({retorno: `${err}`}).end();
      }
      else{
        await crud('participantes', req.body, 'delete');
        res.json({resultado: "Excluido com sucesso."}).end();
      }
    }
    catch (err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  
  router.post('/participantes', upload.any(), async function (req, res) {
    try{
      //const file = req.files[0] == undefined ? '' : req.files[0].buffer;
      const file = req.files && req.files[0] ? req.files[0].buffer : '';
      const body = JSON.parse(req.body.body);
      body.copiaDocumento = file;
      retorno = await crud('participantes', req.body, 'lastCode');
      if (retorno.length > 0)
        body.codigo = retorno[0].codigo + 1;
      else
        body.codigo = 1;
      await crud('participantes', body, 'insert');
      res.json({resultado: "Inserido com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  });

module.exports = router