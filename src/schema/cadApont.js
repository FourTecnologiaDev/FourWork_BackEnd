const mongoose = require("mongoose");

let CadastroApontamento;

// Verifica se o modelo já foi definido antes de tentar defini-lo novamente
function mongoSchemaCadastro() {
  if (!CadastroApontamento) {
    const cadastroSchema = new mongoose.Schema({
      codigo: {
        type: String,
      },
      cliente: {
        type: Number,
      },
      RAT: {
        type: Number,
      },
      nomePessoa: {
        type: String,
        required: true
      },     
      tipoPessoa: {
        type: String,
        required: true,
      },
      ValorH: {
        type: String,
      }, 
      HorasT: {
        type: String,
      }, 
      ValorAdc: {
        type: String,
      }, 
      Data: {
        type: Number,
      },
      Desc: {
        type: String,
      },
    });

    CadastroApontamento = mongoose.model('CadastroApontamento', cadastroSchema);
  }

  return CadastroApontamento;
}

module.exports = mongoSchemaCadastro;