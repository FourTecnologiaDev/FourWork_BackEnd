function mongoSchemaLogin() {
  const mongoose = require("mongoose");
  var loginSchema = new mongoose.Schema({
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
  })
  //Collection
  return mongoose.model('login', loginSchema);
}

module.exports = mongoSchemaLogin;
