function mongoSchemaEmpresas() {
  const mongoose = require("mongoose");
  var empresasSchema = new mongoose.Schema({
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
    }
  })
  //Collection
  return mongoose.model('empresas', empresasSchema);
}

module.exports = mongoSchemaEmpresas;
