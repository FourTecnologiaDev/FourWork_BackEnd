
/**
 * O modulo inclui informações na entidade dadosCadastraisParticipantes
 * para que possa ser criada uma ordem das perguntas do formulario 
 * selecionado no evento.
 * 
 * A partir da gravação das respostas são excluidas as perguntas dessa entidade
 * para dessa forma poder selecionar a proxima.
 * 
 * Após o termino, caso tenha que refazer o questionario é necessario excluir 
 * o registro que ficara sem questoes da entidade dadosCadastraisParticipantes
 * 
 */
insertQuestions = async (telefone, link) => {
    
        try{
          // ***** Apaga registro da entidade caso já exista algum registro
          respostas = await crud('dadosCadastraisParticipantes', {"whats": telefone}, 'delete');
  
          // ***** Retorna dados do participante, evento e formulario
          let participante = await crud('participantes', {"whats": telefone}, 'find');
          let codParticipante = participante[0].codigo
/*          let evento = parseInt(participante[0].codigoEvento)
          let codFormulario = await crud('eventos', {"codigo": evento}, 'find');
          codFormulario = parseInt(codFormulario[0].dadosCadastrais)
          let dadosForm =  await crud('dadosCadastrais', {"codigo": codFormulario}, 'find');
          let dados = dadosForm[0].dados*/

          // ***** Exclui o campo ID do array de perguntas
/*          for(var i = 0; i < dados.length; i++){
            delete dados[i]._id
          }
*/
          // ***** Insere as questoes na entidade dadosCadastraisParticipantes
          let dadosCP = {}
          dadosCP.whats = telefone
          dadosCP.codigoParticipante = codParticipante
//          dadosCP.dados = dados
          dadosCP.link = link
          dadosCP.toUpdate = ''
          dadosCP = JSON.stringify(dadosCP)
          dadosCP = JSON.parse(dadosCP)
          await crud('dadosCadastraisParticipantes', dadosCP, 'insert');
        }
        catch(err){
          respostas.body;
        }
  };
  module.exports = insertQuestions;
  