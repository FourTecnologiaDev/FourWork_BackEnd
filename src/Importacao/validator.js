validator = async (tabela, arquivo) => {
  const cpfCheck = require("cpf-check");

  let exportar = [];
  let retorno = {
    registro: [],
    arquivo: {},
  };

  // valida importação da tabela participantes, verifica se existe o evento associado
  if ((tabela == "participantes")) {
    const eventos = await crud("eventos", {}, "find");

    for (i = 0; Object.keys(arquivo).length > i; i++) {
      let cpf = arquivo[i].cpf;
      let valido = true;
      let codigoEvento

      // Validação do evento
      if (arquivo[i].codigoEvento) {
        codigoEvento = arquivo[i].codigoEvento;

        if (!eventos.find((map) => map.codigo == codigoEvento)) {
          retorno.registro.push("Linha " + (i+1).toString() + " Codigo do evento não encontrado."
          );
          valido = false;
        }
      }

      // Validação do CPF
      if (cpf <= 0) {
        if (!cpfCheck.validate(cpf)) {
          retorno.registro.push("Linha " + (i+1).toString() + " CPF inválido.");
          valido = false;
        }
      }

      // Validação se já existe o CPF no evento
      if(cpf != undefined){
        const participante = await crud("participantes", {"cpf": cpf, "codigoEvento": codigoEvento}, "find");
        if(Object.keys(participante).length > 0){
        retorno.registro.push("Linha " + (i+1).toString() + " Participante já cadastrado para esse evento.");
        valido = false;
      }

      }

      // Verifica se está validado e caso não esteja retira o registro
      if (valido) { 
        let codigo = await crud(tabela, "", "lastCode");
        arquivo[i].codigo = codigo.length > 0 ? codigo[0].codigo + i + 1 : 1;
        exportar.push(arquivo[i])
      }
    //   } else {
    //     arquivo.splice(i, 1);
    //     i--;
    //   }
    }
    retorno.arquivo = exportar;
  } else {
    retorno.arquivo = arquivo;
  }
  return retorno;
};
module.exports = validator;
