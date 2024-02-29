const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const crud = require("../crud");

async function gerarPDF(req, res) {
  const doc = new PDFDocument({ size: "A4", bufferPages: true });

  let numLinhas = 0;

  // Função para calcular o número de linhas
  function calcularNumLinhas(texto) {
    const tamanhoTexto = texto.match(/.{1,53}/g)[0].length; // Separa o texto em blocos de até 53 caracteres(Tamanho que suporta uma linha).

    if (tamanhoTexto !== 0) {
      // Verifica se o tamanho do texto é maior que zero(Pois a const tamanhoTexto separa o texto entre 0 e 53 caracteres).
      numLinhas += 1; // Se tiver pelo menos um caracter, adiciona uma linha.
    }

    if (numLinhas == 40) {
      // Quando o número de linhas for igual a 40, adiciona uma nova página e inicia contagem novamente.
      adicionarNovaPagina();
      numLinhas = 0;
    }
  }

  //Função para formatar data
  function formatDate(date) {
    const parts = date.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  // Função para formatar a data do cabeçalho
  function formatDateHeader(date) {
    const dateStringWithoutGMT = date.replace("GMT-0300", "").trim();

    const originalDate = new Date(dateStringWithoutGMT);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours().toString().padStart(2, "0");
    const minutes = originalDate.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours - 3}:${minutes}`;
  }

  // Busca as informações do evento
  const dadosEvento = await crud(
    "eventos",
    { codigo: req.body.codigoEvento },
    "find"
  );

  // const codigoCartaConvite = dadosEvento.map((event) => {
  //   return event.cartaConvite;
  // });

  // const dadosCarta = await crud(
  //   "cartaConvite",
  //   { codigo: codigoCartaConvite[0] },
  //   "find"
  // );

  // const ImageBase64 = `data:image/png;base64,${dadosCarta[0].logo}`;

  // let matches = ImageBase64.match(/^data:image\/png;base64,([^]*)$/);

  // let buffer = Buffer.from(matches[1], 'base64');

  // fs.writeFileSync('imagem_salva.png', buffer, { encoding: 'base64' });

  // Resolve o caminho absoluto para a imagem do logo
  const caminhoLogo = path.resolve(__dirname, "../assets/pleme7-logo.png");

  // Função para adicionar uma nova página ao documento
  function adicionarNovaPagina() {
    doc.addPage();

    // Adiciona o logo no cabeçalho
    doc.image(caminhoLogo, 50, 50, { width: 100 });

    doc.moveUp(0.8);

    // Adiciona data e hora no cabeçalho
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Datas e horários em GMT - 03:00 Brasília`, {
        align: "right",
        width: 480,
      });
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(
        `Log gerado em ${formatDateHeader(new Date().toString())}, versão 1.0`,
        {
          align: "right",
          width: 480,
        }
      );

    // Adiciona uma linha separadora entre cabeçalho e conteúdo
    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    doc.moveDown(1);

    // Redefine a contagem de palavras para a nova página
    contagemPalavras = 0;
  }

  // Adiciona o logo no cabeçalho da primeira página
  doc.image(caminhoLogo, 50, 50, { width: 100 });

  doc.moveUp(0.8);

  // Adiciona data e hora no cabeçalho da primeira página
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Datas e horários em GMT - 03:00 Brasília`, {
      align: "right",
      width: 480,
    });
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(
      `Log gerado em ${formatDateHeader(new Date().toString())}, versão 1.0`,
      {
        align: "right",
        width: 480,
      }
    );

  // Adiciona uma linha separadora entre cabeçalho e conteúdo
  doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Adiciona um espaço abaixo do cabeçalho
  doc.moveDown(1);

  dadosEvento.forEach((event) => {
    doc.font("Helvetica-Bold").fontSize(14).text("Dados evento:").moveDown(0.5);
    calcularNumLinhas("Dados evento:");

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(`Nome evento: `, {
        continued: true,
      })
      .font("Helvetica")
      .text(`${event.nome}`)
      .moveDown(0.5);
    calcularNumLinhas(`Nome evento: ${event.nome}`);

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(`Local: `, {
        continued: true,
      })
      .font("Helvetica")
      .text(
        `${event.endereco} ${
          event.endereco2 != "" ? `- ${event.endereco2}` : ""
        }`
      )
      .moveDown(0.5);
    calcularNumLinhas(
      `Local: ${event.endereco} ${
        event.endereco2 != "" ? `- ${event.endereco2}` : ""
      }`
    );

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(`Data: `, {
        continued: true,
      })
      .font("Helvetica")
      .text(`${formatDate(event.dataEntrada)} - ${formatDate(event.dataSaida)}`)
      .moveDown(0.5);
    calcularNumLinhas(
      `Data: ${formatDate(event.dataEntrada)} - ${formatDate(event.dataSaida)}`
    );
  });

  // Adiciona uma linha para separar o conteúdo dos logs das infos do evento
  doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();

  // Adiciona espaçamento
  doc.moveDown(0.8);

  // doc
  //   .font("Helvetica-Bold")
  //   .fontSize(14)
  //   .text("Relatório de logs", {
  //     align: "center",
  //   })
  //   .moveDown(0.5);
  // numLinhas += "Relatório de logs".split(/\s+/).length;

  // Adiciona o conteúdo do histórico da interação com o participante
  const dadosParticipante = await crud("participantes", req.body, "find");
  dadosParticipante.forEach((element) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Nome Participante: ${element.nome}`)
      .moveDown(0.5);
    calcularNumLinhas(element.nome);

    element.historico.forEach((historico) => {
      const larguraTexto = doc.widthOfString(`${historico.data}  -  `);

      doc
        .font("Helvetica")
        .fontSize(11)
        .text(`${historico.data}  -  ${historico.comentario}`, {
          align: "justify",
        })
        .moveDown(0.5);
      calcularNumLinhas(historico.data);
      calcularNumLinhas(historico.comentario);
      if (historico.questionario && Array.isArray(historico.questionario)) {
        historico.questionario.forEach((questionario) => {
          if (questionario.pergunta) {
            const perguntas = questionario.pergunta.match(/.{1,53}/g) || [
              questionario.pergunta,
            ];
            perguntas.forEach((pergunta, index) => {
              const prefixo = index === 0 ? "Pergunta: " : ""; // Adiciona o prefixo apenas na primeira parte da pergunta
              doc.font("Helvetica").fontSize(11).text(`${prefixo}${pergunta}`, {
                indent: larguraTexto,
                align: "left",
              });
              calcularNumLinhas(pergunta);
            });
          }
          if (questionario.resposta) {
            const respostas = questionario.resposta.match(/.{1,53}/g) || [
              questionario.resposta,
            ];
            respostas.forEach((resposta, index) => {
              const prefixo = index === 0 ? "Resposta: " : ""; // Adiciona o prefixo apenas na primeira parte da resposta
              doc.font("Helvetica").fontSize(11).text(`${prefixo}${resposta}`, {
                indent: larguraTexto,
                align: "left",
              });
              calcularNumLinhas(resposta);
            });
          }
          doc.moveDown(0.5);
        });
      }
    });
  });

  // Obtem o intervalo das páginas em buffer
  const range = doc.bufferedPageRange();

  for (
    i = range.start, end = range.start + range.count, range.start <= end;
    i < end;
    i++
  ) {
    doc.switchToPage(i);
    // Adiciona uma linha separadora entre conteúdo e rodapé
    doc.lineWidth(1).moveTo(50, 680).lineTo(550, 680).stroke();
    // Adiciona a imagem no rodapé, alinhada à esquerda
    doc.image(caminhoLogo, 50, 705, { width: 60 });
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Página ${i + 1} de ${range.count}`, 450, 715, {
        align: "right",
      });
  }

  // Manualmente limpa as páginas em buffer
  doc.flushPages();

  // Salva o documento PDF e envia para o cliente
  doc.pipe(res);
  doc.end();
}

module.exports = gerarPDF;
