const mongoose = require("mongoose");

function mongoSchemaCadastroPessoa() {
  const ticketSchema = new mongoose.Schema({
    codigo: {
      type: Number,
      required: true
    },
    CNPJ: {
      type: String,
    }, 
    CPF: {
      type: String,
    }, 
    Nome: {
      type: String,
    }, 
    Email: {
      type: String,
    }, 
    TipoPessoa: {
      type: String,
    }, 
    CEP: {
      type: String,
    }, 
    Endereço: {
      type: String,
    }, 
    Numero: {
      type: String,
    },
    Telefone: {
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
      type: String,
    },
  });

  // Modelo para a coleção "tickets"
  return mongoose.model('cadastroPessoa', ticketSchema);
}

module.exports = mongoSchemaCadastroPessoa;
