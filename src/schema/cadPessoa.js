const mongoose = require("mongoose");

let CadastroPessoa;

// Verifica se o modelo já foi definido antes de tentar defini-lo novamente
function mongoSchemaCadastroPessoa() {
  if (!CadastroPessoa) {
    const cadastroSchema = new mongoose.Schema({
      codigo: {
        type: Number,
      },
      fornecedor: {
        type: Number,
      },
      CNPJ: {
        type: Number,
      }, 
      CPF: {
        type: Number,
      }, 
      nomePessoa: {
        type: String,
      }, 
      Email: {
        type: String,
      }, 
      tipoPessoa: {
        type: String,
      }, 
      CEP: {
        type: String,
      }, 
      Endereço: {
        type: String,
      }, 
      Número: {
        type: Number,
      },
      Telefone: {
        type: String,
      },
      ValorH: {
        type: Number,
      },
      HorasT: {
        type: Number,
      },
      ValorAdc: {
        type: Number,
      },
      Data: {
        type: String,
      },
      diasUteis: {
        type: String,
      },
    });

    // Define the model with the correct name
    CadastroPessoa = mongoose.model('cadPessoa', cadastroSchema);
  }

  return CadastroPessoa;
}

module.exports = mongoSchemaCadastroPessoa;
