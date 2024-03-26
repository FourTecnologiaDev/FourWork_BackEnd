const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./src/routes/routes");
const cors = require('cors');
const mongoSchemaClientes = require("./src/schema/clientes");
const mongoSchemaEmpresas = require("./src/schema/empresas");
const mongoSchemaEventos = require("./src/schema/eventos");
const mongoSchemaLogin = require("./src/schema/login");
const mongoSchemaParticipantes = require("./src/schema/participantes");
const mongoSchemaFornecedores = require("./src/schema/fornecedores");
const mongoSchemaServicos = require("./src/schema/servicos");
const mongoSchemaTipo_Evento = require("./src/schema/tipo_evento");
const mongoSchemaCartaConvite = require("./src/schema/cartaConvite");
const mongoSchemaCartaInformativa = require("./src/schema/cartaInformativa");
const mongoSchemaQuestionario = require("./src/schema/questionario");
const mongoSchemaDadosCadastrais = require("./src/schema/dadosCadastrais");
const mongoSchemaRobo = require("./src/schema/roboWhats");
const mongoSchemaDadosCadastraisParticipantes = require("./src/schema/dadosCadastraisParticipantes");
const mongoSchemaTickets = require("./src/schema/tabela")
const mongoSchemaFinalizados = require ("./src/schema/finalizado")
const mongoSchemaCadastro = require ("./src/schema/cadPessoa")

require("dotenv").config();  


mongoSchemaClientes();
mongoSchemaEmpresas();
mongoSchemaEventos();
mongoSchemaLogin();
mongoSchemaParticipantes();
mongoSchemaFornecedores();
mongoSchemaServicos();
mongoSchemaTipo_Evento();
mongoSchemaCartaConvite();
mongoSchemaCartaInformativa();
mongoSchemaQuestionario();
mongoSchemaDadosCadastrais();
mongoSchemaRobo();
mongoSchemaDadosCadastraisParticipantes();
mongoSchemaTickets();
mongoSchemaFinalizados();
mongoSchemaCadastro();

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




