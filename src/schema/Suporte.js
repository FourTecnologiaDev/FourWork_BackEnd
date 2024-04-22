function mongoSchemaSuporte() {
  const mongoose = require("mongoose");
  var schemaSuporte = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    }, 
	  password: {
      type: String,
      require: true
    },
    empresa: {
      type: String,
      require: true
    },
    userId: {
      type: String, 
      unique: true,
      require: true
    }
  })
  //Collection
  return mongoose.model('SuporteUsuario', schemaSuporte);
}

module.exports = mongoSchemaSuporte;
