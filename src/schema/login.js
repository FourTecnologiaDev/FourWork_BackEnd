function mongoSchemaLogin() {
  const mongoose = require("mongoose");
  var loginSchema = new mongoose.Schema({
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true
    },
  })
  //Collection
  return mongoose.model("login", loginSchema);
}

module.exports = mongoSchemaLogin;
