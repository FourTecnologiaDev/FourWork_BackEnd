function mongoSchemaFornecedores() {
  const mongoose = require("mongoose");
  var fornecedoresSchema = new mongoose.Schema({
    codigo: {
      type: BigInt,
      require: true
    },
    nomeFornecedor: {
      type: String,
      require: true
    },
    cnpj: {
      type: String,
      require: true
    },
    cep: {
      type: String,
      require: true
    },
    endereco: {
      type: String,
      require: true
    },
    numero: {
      type: String,
      require: true
    },
    endereco2: {
      type: String,
      require: true
    },
    contatos: [{
      nome: {
        type: String,
        require: true
      },
      cargo: {
        type: String,
        require: true
      },
      email: {
        type: String,
        require: true
      },
      tel1: {
        type: String,
        require: true
      },
      tel2: {
        type: String,
        require: true
      }
    }],
    servicos: [{
      servico: {
        type: String,
        require: false
      }
    }]
  })
  //Collection
  return mongoose.model('fornecedores', fornecedoresSchema);
}

module.exports = mongoSchemaFornecedores;
