const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer();

router.post(`/pesquisarCartaInformativa`, async function (req, res) {
    try{
      retorno = await crud('cartaInformativa', req.body, 'find');
      res.send(retorno).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .put(`/cartaInformativa`,  upload.any(), async function (req, res) {
    try{
      const body = JSON.parse(req.body.body);
      for(x = 0; Object.keys(req.files).length > x; x++){
        body[req.files[x].fieldname] = req.files[x].buffer;
      }
      await crud('cartaInformativa', body, 'update');
      res.json({resultado: "Atualizado com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .delete(`/cartaInformativa`, async function (req, res) {
    try{
      if(req.body._id == undefined){
        err = `ID do registro não foi informado!`;
        res.status(500).json({retorno: `${err}`}).end();
      }
      else{
        await crud('cartaInformativa', req.body, 'delete');
        res.json({resultado: "Excluido com sucesso."}).end();
      }
    } 
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .post('/cartaInformativa', upload.any(), async function (req, res) {
    try{
      const body = JSON.parse(req.body.body);

      const { codigo, ...restBody } = body;

      let requestData = {};

      retorno = await crud("cartaInformativa", req.body, 'lastCode');
        if (retorno.length > 0)
          requestData = { codigo: retorno[0].codigo + 1, ...restBody };
        else
          requestData = { codigo: 1, ...restBody };

      for(x = 0; Object.keys(req.files).length > x; x++){
        requestData[req.files[x].fieldname] = req.files[x].buffer;
      }

      await crud('cartaInformativa', requestData, 'insert');
      res.json({resultado: "Inserido com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  });
  
  module.exports = router