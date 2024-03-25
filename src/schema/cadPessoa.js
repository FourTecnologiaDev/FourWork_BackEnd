const mongoose = require("mongoose");

function mongoSchemaCadastroPessoa() {
  const ticketSchema = new mongoose.Schema({
    codigo: {
      type: Number,
      required: true
    },
    fornecedor: {
      type: Number,
      required: true
    },
    CNPJ: {
      type: Number,
    }, 
    CPF: {
      type: Number,
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
      type: Number,
    }, 
    Endereço: {
      type: String,
    }, 
    Numero: {
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
  });

  // Modelo para a coleção "tickets"
  return mongoose.model('cadastroPessoa', ticketSchema);
}

module.exports = mongoSchemaCadastroPessoa;
