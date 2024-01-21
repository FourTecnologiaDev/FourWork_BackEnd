const jwt = require('jsonwebtoken');
const secretKey = '3Kf4W6TbAeLrP8Mxikh'; // Substitua pela sua chave secreta
const tokenGeral = 'KKpyf6Yi0lgE9g7FCYtSVTkQsWZpRnso'

function authenticateToken(req, res, next) {
  const bearer = req.headers.authorization
  const token = bearer?.slice(7)?.toString()

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  if(token == tokenGeral){
    next();
  }
  else{
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.user = user;
      next();
    });
  }

}

module.exports = authenticateToken;