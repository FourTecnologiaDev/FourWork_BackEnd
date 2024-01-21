async function sendMsg(req, res) {
  const axios = require("axios");
  const baseApi = "https://whatsapp.fourtc.com.br";
  const insertQuestions = require('./InsertQuestions')

  let token
  const body = {
    username: "henrique",
    password: "Four@123",
  };

  // ***** Retorna o token para o envio da mensagem
  try {
    const response = await axios.post(`${baseApi}/login`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    });   
    token = response.data.token;

  } catch (error) {
    return error
  }

  // ***** Envia a mensagem
  try {
    envios = req.body
    for(element of envios){
      
      response = await axios.post(`${baseApi}/sendTemplate`, element, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`
        }
      });   
      
      insertQuestions(element.telefone, element.link);
    }
  
  } catch (error) {
    return error
  } 
}

module.exports = sendMsg;
