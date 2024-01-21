function mongoSchemaClientes() {
  const mongoose = require("mongoose");
  var clientesSchema = new mongoose.Schema({
    codigo: {
      type: BigInt,
      require: true
    },
    nomeEmpresa: {
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
                },
              }]
  })
  //Collection
  return mongoose.model('clientes', clientesSchema);
}

module.exports = mongoSchemaClientes;
