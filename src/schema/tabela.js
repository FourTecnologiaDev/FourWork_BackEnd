const mongoose = require("mongoose");

function mongoSchemaTickets() {
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

  // Modelo para a coleção "tickets"
  return mongoose.model('tabela', ticketSchema);
}

module.exports = mongoSchemaTickets;
