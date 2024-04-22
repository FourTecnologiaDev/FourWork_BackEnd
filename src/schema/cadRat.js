const mongoose = require("mongoose");

let CadastroRAT;

function mongoSchemaCadastro() {
  if (!CadastroRAT) {
    const cadastroSchema = new mongoose.Schema({
      Ratcod: {
        type: Number,
        required: true
      },
      Ratsenior: {
        type: String,
        required: true
      },
      Seniorcod: {
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

    CadastroRAT = mongoose.model('CadRAT', cadastroSchema);
  }

  return CadastroRAT;
}

module.exports = mongoSchemaCadastro;
