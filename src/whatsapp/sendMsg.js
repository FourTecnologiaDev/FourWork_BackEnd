async function sendMsg(req, res) {
  const axios = require("axios");
  const baseApi = "https://whatsapp.fourtc.com.br";

  let token;
  const body = {
    username: "henrique",
    password: "Four@123",
  };

  // Retorna o token para o envio da mensagem
  try {
    const response = await axios.post(`${baseApi}/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    token = response.data.token;
  } catch (error) {
    return error;
  }

  // Envia a mensagem
  try {
    response = await axios.post(`${baseApi}/sendMessage`, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }

  // Envia template
  /*try {
    response = await axios.post(`${baseApi}/sendTemplate`, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }*/
}

module.exports = sendMsg;
