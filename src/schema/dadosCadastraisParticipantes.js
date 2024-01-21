function mongoSchemaDadosCadastraisParticipantes() {
    const mongoose = require("mongoose");
    var dadosCadastraisParticipantesSchema = new mongoose.Schema({
        codigoParticipante: {
            type: BigInt,
            require: true
        },
        whats: {
            type: String,
            require: true
        },
        dados: [{
            campo: {
              type: String,
              require: false
            }
          }],      
        toUpdate: {
            type: String,
            require: true
        },
        link: {
            type: String,
            require: true
        },
    })
    //Collection
    return mongoose.model('dadosCadastraisParticipantes', dadosCadastraisParticipantesSchema);
}

module.exports = mongoSchemaDadosCadastraisParticipantes;
