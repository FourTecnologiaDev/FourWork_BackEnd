const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rounds de hashing

// Função assíncrona para gerar um hash da senha
const hashPassword = async (plainPassword) => {
    try {
      const hash = await bcrypt.hash(plainPassword, saltRounds);
      return hash;
    } catch (error) {
      throw new Error('Erro ao gerar hash da senha');
    }
  };

module.exports = hashPassword;