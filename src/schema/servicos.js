function mongoSchemaServicos() {
    const mongoose = require("mongoose");
    var servicosSchema = new mongoose.Schema({
        codigo: {
            type: BigInt,
            require: true
        },
        nomeServico: {
            type: String,
            require: true
        }
    })
    //Collection
    return mongoose.model('servicos', servicosSchema);
}

module.exports = mongoSchemaServicos;
