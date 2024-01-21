const express = require("express");
const router = express.Router();
const crud = require("../crud");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post("/autenticacao", async function (req, res) {
    try{

      let retorno 
      let match
      let authenticate = false
      if(req.body.email && req.body.password)
        retorno = await crud('login', req.body, 'authenticate');
        if(retorno)
          authenticate = (retorno.length == 0 ? false : true)

      // Autentica com a criptografia
      retorno = await crud('login', {email: req.body.email}, 'find');
      if(retorno)
        match = await bcrypt.compare(req.body.password, retorno[0].password)
    
      if (match) 
        authenticate = true

      if(authenticate){
        authenticate = {};
        authenticate.authenticate = true;
        authenticate.token = jwt.sign(req.body, '3Kf4W6TbAeLrP8Mxikh', {
          expiresIn: '1440m'
        }) 
      }else{
        authenticate = {};
        authenticate.authenticate = false;
      }
      res.send(authenticate).end();
    }
    catch(err){
      res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
    }
  }) 

  module.exports = router