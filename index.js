const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./src/routes/routes");
const cors = require('cors');


const mongoSchemaCadastro = require ("./src/schema/cadApont")
const mongoSchemaCadastroP = require("./src/schema/CadPessoa")
const mongoSchemaLogin = require ("./src/schema/login")

require("dotenv").config();  

mongoSchemaCadastro();
mongoSchemaCadastroP();
mongoSchemaLogin();

app.use(express.static('src'));
app.use(cors()); 

  mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});  

// routes
app.use("/", routes);

// Server
const porta = 3000
app.listen(process.env.PORT || porta);
// app.listen(porta, function() {
 
   console.log("servidor rodando na porta: " + process.env.PORT || porta);
   
// });
///