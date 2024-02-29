const mongoose = require("mongoose");

function mongoSchemaTickets() {
  const ticketSchema = new mongoose.Schema({
    codigo: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true
    }, 
    sistema: {
      type: String,
      required: true
    }, 
    question: {
      type: String,
      required: true
    }
  });

  // Modelo para a coleção "tickets"
  return mongoose.model('Ticket', ticketSchema);
}

module.exports = mongoSchemaTickets;
