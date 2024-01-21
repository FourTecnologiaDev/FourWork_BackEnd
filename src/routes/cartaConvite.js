const express = require("express")
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer();

router.post(`/pesquisarCartaConvite`, async function (req, res) {
    try{
      retorno = await crud('cartaConvite', req.body, 'find');
      res.send(retorno).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .put(`/cartaConvite`,  upload.any(), async function (req, res) {
    try{
      const body = JSON.parse(req.body.body);
      for(x = 0; Object.keys(req.files).length > x; x++){
        body[req.files[x].fieldname] = req.files[x].buffer;
      }
      await crud('cartaConvite', body, 'update');
      res.json({resultado: "Atualizado com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .delete(`/cartaConvite`, async function (req, res) {
    try{
      if(req.body._id == undefined){
        err = `ID do registro não foi informado!`;
        res.status(500).json({retorno: `${err}`}).end();
      }
      else{
        await crud('cartaConvite', req.body, 'delete');
        res.json({resultado: "Excluido com sucesso."}).end();
      }
    } 
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  })
  .post('/cartaConvite', upload.any(), async function (req, res) {
    try{
      const body = JSON.parse(req.body.body);
      for(x = 0; Object.keys(req.files).length > x; x++){
        body[req.files[x].fieldname] = req.files[x].buffer;
      }
      await crud('cartaConvite', body, 'insert');
      res.json({resultado: "Inserido com sucesso."}).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  });
  
  module.exports = router