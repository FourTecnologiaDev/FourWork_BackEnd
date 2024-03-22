const PDFDocument = require("pdfkit");
const path = require("path");
const crud = require("../crud");

async function gerarPDF(req, res) {
  const doc = new PDFDocument({
    size: "A4",
    bufferPages: true,
    margins: { top: 85, left: 75, bottom: 85, right: 75 },
  });

  // Diretório do logo
  const caminhoLogo = path.resolve(__dirname, "../assets/pleme7-logo.png");

  // Função para formatar a data em DD/MM/YYYY
  function formatarData(date) {
    const parts = date.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  // Função para formatar a data em "DD de MM de YYYY, às HH:mm"
  function formatarDataCabecalho(data) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "America/Sao_Paulo",
    };

    return data.toLocaleString("pt-BR", options);
  }

  doc.image(caminhoLogo, 50, 75, { width: 100 });
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(`Datas e horários em GMT - 03:00 Brasília`, {
      align: "right",
      width: 470,
    })
    .text(`Log gerado em ${formatarDataCabecalho(new Date())}, versão 1.0`, {
      align: "right",
      width: 470,
    });
  doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.8);

  // Função a ser chamada para criar o cabeçalho em todas as novas péginas
  doc.on("pageAdded", () => {
    doc.image(caminhoLogo, 50, 75, { width: 100 });
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Datas e horários em GMT - 03:00 Brasília`, {
        align: "right",
        width: 470,
      })
      .text(`Log gerado em ${formatarDataCabecalho(new Date())}, versão 1.0`, {
        align: "right",
        width: 470,
      });
    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.8);
  });

  // Armazena os dados do evento
  const dadosEvento = await crud(
    "eventos",
    { codigo: req.body.codigoEvento },
    "find"
  );

  // Armazena os dados da carta
  const cartaConvite = await crud(
    "cartaConvite",
    { codigo: dadosEvento[0].cartaConvite },
    "find"
  );

  // Armazena os dados do participante
  const dadosParticipante = await crud("participantes", req.body, "find");

  // Percorre as informações e insere no documento
  dadosEvento.forEach((event) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Dados evento:")
      .moveDown(0.25);

    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Nome evento: ${event.nome}`)
      .text(
        `Local: ${event.endereco} ${
          event.endereco2 ? `- ${event.endereco2}` : ""
        }`
      )
      .text(
        `Data: ${formatarData(event.dataEntrada)} - ${formatarData(
          event.dataSaida
        )}`
      )
      .moveDown(0.25);

    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(0.8);

    if (cartaConvite.length > 0) {
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("Carta convite", {
          align: "center",
        })
        .moveDown(0.25);

      doc
        .font("Helvetica")
        .fontSize(11)
        .text(
          `${cartaConvite[0].descricao
            .replace("<participante>", dadosParticipante[0].nome)
            .replace("<nomeEvento>", event.nome)
            .replace("<datain>", formatarData(event.dataEntrada))
            .replace("<dataout>", formatarData(event.dataSaida))}`
        );

      doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.8);
    }
  });

  // Percorre as informações e insere no documento
  dadosParticipante.forEach((element) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`Nome Participante: ${element.nome}`)
      .moveDown(0.25);

    element.historico.forEach((historico) => {
      const larguraTexto = doc.widthOfString(`${historico.data}  -  `);

      doc
        .font("Helvetica")
        .fontSize(11)
        .text(`${historico.data}  -  ${historico.comentario}`, {
          align: "justify",
        });

      if (historico.questionario && Array.isArray(historico.questionario)) {
        historico.questionario.forEach((questionario) => {
          if (questionario.pergunta) {
            doc
              .font("Helvetica")
              .fontSize(11)
              .text(`Pergunta: ${questionario.pergunta}`, {
                indent: larguraTexto,
                align: "left",
              });
          }
          if (questionario.resposta) {
            doc
              .font("Helvetica")
              .fontSize(11)
              .text(`Resposta: ${questionario.resposta}`, {
                indent: larguraTexto,
                align: "left",
              });
          }
        });
      }

      doc.moveDown(0.2);
    });
  });

  // Armazena o range das páginas
  const range = doc.bufferedPageRange();

  // Cria o rodapé com o logo e a numeração da página
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.lineWidth(1).moveTo(50, 750).lineTo(550, 750).stroke();
    doc.image(caminhoLogo, 50, 752, { width: 60 });
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Página ${i + 1} de ${range.count}`, 480, 757, {
        align: "right",
        width: "100%",
      });
  }

  // Descarrega as páginas armazenadas em buffer
  doc.flushPages();
  // Encaminha o conteúdo do documento PDF para a resposta HTTP
  doc.pipe(res);
  // Finaliza o documento PDF
  doc.end();
}

// Exporta a função gerarPDF para ser utilizada em outros arquivos
module.exports = gerarPDF;