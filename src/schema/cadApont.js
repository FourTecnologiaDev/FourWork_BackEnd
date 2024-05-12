const mongoose = require("mongoose");

let CadastroApontamento;

// Verifica se o modelo já foi definido antes de tentar defini-lo novamente
function mongoSchemaCadastro() {
  if (!CadastroApontamento) {
    const cadastroSchema = new mongoose.Schema({
      codigo: {
        type: String,
      },
      codigoCliente: {
        type: Number,
      },
      RAT: {
        type: String,
        unique: true,
      },
      nomePessoa: {
        type: String,
      },        
      Email: {
        type: String,
      },     
      nomeCliente: {
        type: String,
      },     
      tipoPessoa: {
        type: String, 
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
        type: Date, // Corrigido para Date
      },
      desc: {
        type: String,
      },
    });

    CadastroApontamento = mongoose.model('CadastroApontamento', cadastroSchema);
  }

  return CadastroApontamento;
}

module.exports = mongoSchemaCadastro;
