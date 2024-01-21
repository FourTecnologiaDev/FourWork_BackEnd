function mongoSchemaQuestionario() {
  const mongoose = require("mongoose");
  var QuestionarioSchema = new mongoose.Schema({
    codigo: {
      type: BigInt,
      require: true,
    },
    descricao: {
      type: String,
      require: true,
    },
    clientes: [{
        codigo: {
            type: BigInt,
            require: true
        }
    }],
    ativo: {
        type: Boolean,
        require: true
    },
    orientacoes: {
      type: String,
      require: true,
    },
    questoes: [
      {
        pergunta: {
          type: String,
          require: false,
        },
        tipo: {
          type: String,
          require: false,
        },
        multipla: [
          {opcoes: {
            type: String,
            require: false
          }}
        ],
        resposta: {
          type: String,
          require: false,
        },
        justifique: {
          type: String,
          require: false,
        },
        obrigatoria: {
          type: String,
          require: false,
        },
      },
    ],
  });
  //Collection
  return mongoose.model("questionario", QuestionarioSchema);
}

module.exports = mongoSchemaQuestionario;
