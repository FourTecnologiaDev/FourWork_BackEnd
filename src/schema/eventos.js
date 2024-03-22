function mongoSchemaEventos() {
  const mongoose = require("mongoose");
  var eventosSchema = new mongoose.Schema({
    codigo: {
      type: BigInt,
      require: true,
    },
    nome: {
      type: String,
      require: true,
    },
    clientes: [
      {
        codigo: {
          type: BigInt,
          require: true,
        },
      },
    ],
    cep: {
      type: String,
      require: true,
    },
    endereco: {
      type: String,
      require: true,
    },
    numero: {
      type: String,
      require: true,
    },
    endereco2: {
      type: String,
      require: true,
    },
    solicitante: {
      type: String,
      require: true,
    },
    dataSaida: {
      type: String,
      require: true,
    },
    dataEntrada: {
      type: String,
      require: true,
    },
    numeroParticipantes: {
      type: BigInt,
      require: true,
    },
    tipoEvento: {
      type: String,
      require: true,
    },
    statusEvento: {
      type: String,
      require: true,
    },
    confirmacaoEvento: {
      type: Boolean,
      require: true,
    },
    nacional: {
      type: String,
      require: true,
    },
    observacao1: {
      type: String,
      require: true,
    },
    observacao2: {
      type: String,
      require: true,
    },
    observacao3: {
      type: String,
      require: true,
    },
    cartaConvite: {
      type: String,
      require: true,
    },
    cartaInformativa: {
      type: String,
      require: true,
    },
    dadosCadastrais: {
      type: String,
      require: true,
    },
    questionario: {
      type: String,
      require: true,
    },
    emailEvento: {
      type: String,
      require: true,
    },
    emailCC: {
      type: String,
      require: true,
    },
    servicos: [
      {
        servico: {
          type: String,
          require: false,
        },
      },
    ],
  });
  //Collection
  return mongoose.model("eventos", eventosSchema);
}

module.exports = mongoSchemaEventos;
