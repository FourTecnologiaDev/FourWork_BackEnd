const mongoose = require("mongoose");

let CadastroP;

// Verifica se o modelo já foi definido antes de tentar defini-lo novamente
function mongoSchemaCadastroP() {
  if (!CadastroP) {
    const cadastroSchema = new mongoose.Schema({
      codigo: {
        type: String,
      },
      codigoCliente: {
        type: String,
        require: false,
      },
      nomePessoa: {
        type: String, // Corrigindo para String
      },
      nomeCliente: {
        type: String, // Corrigindo para String
      },
      email: {
        type: String, // Corrigindo para String
      },
      senha: {
        type: String,
      },     
      CNPJ: {
        type: String,  
      },
      CPF: {
        type: String,  
      },
      cep: {
        type: String,
      }, 
      ValorH: {
        type: String,
      }, 
      TipoPessoa: {
        type: String,
      }, 
      Endereço: {
        type: String,
      },
      Numero: {
        type: String,
      },
      telefone: {
        type: String,
      },
    });
    
    // Define o modelo com o nome correto
    CadastroP = mongoose.model('cadastrousuario', cadastroSchema);
  }

  return CadastroP;
}

module.exports = mongoSchemaCadastroP;
