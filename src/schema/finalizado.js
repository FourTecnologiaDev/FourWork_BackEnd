const mongoose = require("mongoose");

function mongoSchemaFinalizados() {
  const ticketSchema = new mongoose.Schema({
    codigo: {
      type: Number,
      required: true
    },
    email: {
      type: String,
    }, 
    sistema: {
      type: String,
    }, 
    question: {
      type: String,
    }
  });

  // Modelo para a coleção "finalizados"
  return mongoose.model('finalizado', ticketSchema);
}

module.exports = mongoSchemaFinalizados;
