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
receivedMsg = async (body) => {
  const envMsg = require("./sendMsg");

  try {
    let telefone = body.body.telefone;
    let respostas = await crud("dadosCadastraisParticipantes",{ whats: telefone },"find");

    if(Object.keys(respostas).length > 0){
      let id_respostas = respostas[0]._id
      let link = respostas[0].link
  
      envio = await envMsg({
        body: {
          telefone: telefone,
          textMessage: `Para atualizar seus dados, acesse o link: ${link}`,
        },
      });
      await crud("dadosCadastraisParticipantes", {_id: id_respostas}, "delete");
    }

  } catch (error) {
    
  }

/*  let mensagem = body.body.textMessage;
  if (mensagem) {
    mensagem = mensagem.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    mensagem = mensagem.toLowerCase();
    //let respostas = {};
    console.log(body.body);

    let respostas = await crud("dadosCadastraisParticipantes",{ whats: telefone },"find");
    let id_respostas = respostas[0]._id
    // ***** Verifica se é resposta da questao anterior e faz o update na entidade de participantes
    if(respostas !== undefined){
   
      const participantes = await crud("participantes",{ whats: telefone },"find");
      if(participantes){
        id = participantes[0]._id
        await crud("participantes",{_id: id, [respostas[0].toUpdate]: mensagem},"update");
      }
    }

    // ***** Verifica se existe mensagem para ser enviada
    try {
      if (Object.keys(respostas[0].dados).length > 0){
        envio = await envMsg({
          body: {
            telefone: telefone,
            textMessage: `Digite seu ${respostas[0].dados[0].campo}:`,
          },
        });
        await crud("dadosCadastraisParticipantes",{_id: id_respostas, toUpdate: respostas[0].dados[0].campo },"update")
      }
      } catch (error) {
      console.log(error);
    }

    // ***** Atualiza o array de mensagem, excluindo o item ja enviado
    respostas[0].dados.splice(0, 1);
    delete respostas[0]._id;
    delete respostas[0]._v;
    for (var i = 0; i < respostas[0].dados.length; i++) {
      delete respostas[0].dados[i]._id;
    }    
    await crud("dadosCadastraisParticipantes", {_id: id_respostas, dados : respostas[0].dados}, "update");
  }*/
};
module.exports = receivedMsg;
