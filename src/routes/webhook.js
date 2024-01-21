const express = require("express")
const router = express.Router()
const receivedMsg = require('../whatsapp/receivedMsg')

try {
    router.post('/webhook', express.json({type: 'application/json'}), (req, res) => {
      receivedMsg(req);
      res.status(202).send('Accepted');
    })
  } catch (error) {
    res.status(500).json({retorno: `Algo deu errado!, erro: ${err}`}).end();
  }

  module.exports = router