function mongoSchemaDadosCadastrais() {
    const mongoose = require("mongoose");
    var dadosCadastraisSchema = new mongoose.Schema({
        codigo: {
            type: BigInt,
            require: true
        },
        descricao: {
            type: String,
            require: true
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
        dados: [{
            campo: {
              type: String,
              require: false
            }
          }]
    })
    //Collection
    return mongoose.model('dadosCadastrais', dadosCadastraisSchema);
}

module.exports = mongoSchemaDadosCadastrais;
