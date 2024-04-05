const mongoose = require("mongoose");

let CadastroRAT;

function mongoSchemaCadastro() {
  if (!CadastroRAT) {
    const cadastroSchema = new mongoose.Schema({
      ratcod: {
        type: Number,
        required: false
      },
      Ratsenior: {
        type: String,
        required: false
      },
      seniorcod: {
        type: Number,
        required: false
      }, 
      Stats: {
        type: String,
        required: true
      }, 
      Anexo: {
        data: Buffer, // Armazenará os dados binários do arquivo
        contentType: String // Tipo de conteúdo do arquivo
      }, 
      Data: {
        type: String,
        required: true
      },
    });

    CadastroRAT = mongoose.model('cadastroRAT', cadastroSchema);
  }

  return CadastroRAT;
}

module.exports = mongoSchemaCadastro;
