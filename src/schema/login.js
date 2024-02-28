function mongoSchemaLogin() {
  const mongoose = require("mongoose");
  var loginSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    empresa: {
      type: String,
      required: true
    },
    email: {
      type: String,
      require: true
    }, 
	  password: {
      type: String,
      require: true
    }, 
	  status: {
      type: Boolean,
      require: true
    }
  })
  //Collection
  return mongoose.model('login', loginSchema);
}

module.exports = mongoSchemaLogin;
