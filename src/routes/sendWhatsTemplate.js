const express = require("express");
const router = express.Router();
const sendTemplate = require("../whatsapp/sendTemplate");

router.use(bodyParser.json());
router.use(bodyParser.text({ type: "*/*" }));
router.post(`/sendTemplate`, async function (req, res) {
  try {
    retorno = await sendTemplate(req, res);
    if (retorno instanceof Error) 
      res.status(retorno.response.status).end()
    else 
      res.send(retorno).end();
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

module.exports = router;
