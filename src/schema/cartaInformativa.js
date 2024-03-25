function mongoSchemaCartaInformativa() {
    const mongoose = require("mongoose");
    var cartaInformativaSchema = new mongoose.Schema({
        codigo: {
            type: BigInt,
            require: true
        },
        titulo: {
            type: String,
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
        logo: {
            type: Buffer,
            require: true
        },
        logo2: {
            type: Buffer,
            require: true
        },
        ativo: {
            type: Boolean,
            require: true
        },
        assinatura: {
            type: Buffer,
            require: true
        }
    })
    //Collection
    return mongoose.model('cartaInformativa', cartaInformativaSchema);
}

module.exports = mongoSchemaCartaInformativa;