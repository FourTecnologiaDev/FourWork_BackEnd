function mongoSchemaTipo_evento() {
    const mongoose = require("mongoose");
    var tipo_eventoSchema = new mongoose.Schema({
        codigo: {
            type: BigInt,
            require: true
        },
        tipo_evento: {
            type: String,
            require: true
        }
    })
    //Collection
    return mongoose.model('tipo_evento', tipo_eventoSchema);
}

module.exports = mongoSchemaTipo_evento;
