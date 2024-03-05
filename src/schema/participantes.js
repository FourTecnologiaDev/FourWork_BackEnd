function mongoSchemaParticipantes() {
  const mongoose = require("mongoose");
  var participantesSchema = new mongoose.Schema({
    codigo: {
      type: BigInt,
      require: true,
    },
    codigoEvento: {
      type: BigInt,
      require: true,
    },
    nome: {
      type: String,
      require: true,
    },
    nomeCracha: {
      type: String,
      require: true,
    },
    crm: {
      type: String,
      require: true,
    },
    cpf: {
      type: String,
      require: true,
    },
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
    cidade: {
      type: String,
      require: true,
    },
    estado: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    tel: {
      type: String,
      require: true,
    },
    whats: {
      type: String,
      require: true,
    },
    nascimento: {
      type: String,
      require: true,
    },
    identidade: {
      type: String,
      require: true,
    },
    passporte: {
      type: String,
      require: true,
    },
    copiaDocumento: {
      type: Buffer,
      require: true,
    },
    complemento: {
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
    status: {
      type: String,
      require: true,
    },
    statusInfo: {
      type: String,
      require: true,
    },
    confirmado: {
      type: String,
      require: true,
    },
    historico: [
      {
        data: {
          type: String,
          require: false,
        },
        tipo: {
          type: String,
          require: false,
        },
        comentario: {
          type: String,
          require: false,
        },
        questionario: [
          {
            pergunta: {
              type: String,
              require: false,
            },
            resposta: {
              type: String,
              require: false,
            },
          },
        ],
        origem: {
          type: String,
          require: false,
        },
        usuario: {
          type: String,
          require: false,
        },
      },
    ],
    aereo: [
      {
        statusEmissao: {
          type: String,
          require: false,
        },
        dataEmissao: {
          type: String,
          require: false,
        },
        dataRemissao: {
          type: String,
          require: false,
        },
        trechos: [
          {
            trecho: {
              type: String,
              require: false,
            },
            data: {
              type: String,
              require: false,
            },
            ciaArea: {
              type: String,
              require: false,
            },
            voo: {
              type: String,
              require: false,
            },
            origem: {
              type: String,
              require: false,
            },
            destino: {
              type: String,
              require: false,
            },
            horaSaida: {
              type: String,
              require: false,
            },
            horaChegada: {
              type: String,
              require: false,
            },
          },
        ],
      },
    ],
    transporte: [
      {
        data: {
          type: String,
          require: false,
        },
        origem: {
          type: String,
          require: false,
        },
        destino: {
          type: String,
          require: false,
        },
        horaSaida: {
          type: String,
          require: false,
        },
        horaChegada: {
          type: String,
          require: false,
        },
        tipo: {
          type: String,
          require: false,
        },
      },
    ],
    hotel: [
      {
        nomeHotel: {
          type: String,
          require: false,
        },
        enderecoHotel: {
          type: String,
          require: false,
        },
        dataCheckIn: {
          type: String,
          require: false,
        },
        dataCheckOut: {
          type: String,
          require: false,
        },
        horaCheckIn: {
          type: String,
          require: false,
        },
        horaCheckOut: {
          type: String,
          require: false,
        },
      },
    ],
  });
  //Collection
  return mongoose.model("participantes", participantesSchema);
}

module.exports = mongoSchemaParticipantes;
