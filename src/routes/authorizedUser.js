const express = require('express');
const router = express.Router();


// Rota para fornecer a lista de usuários autorizados
router.post('/authorizedUsers', (req, res) => {
  console.log(req.body)
  if (req.body.email.includes('@fourtec.com.br')) {
    res.json({
      isAuth: true
    })
  } else {
    res.json({
      isAuth: false
    })
  }
});

module.exports = router;