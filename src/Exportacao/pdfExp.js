const {jsPDF} = require("jspdf"); 
const crud = require('../crud')

async function pdfExp (req, res) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm", 
        format: "a4"
      });
    
    const dados = await crud('participantes', req.body, 'find')

    let linha = 10
    const larguraMaxima = doc.internal.pageSize.width - 20; // 20 mm de margem direita


    for(element of dados){
        doc.text(element.nome, 10, linha);
        linha = linha + 10
        const registroArray = element.historico.filter(elemento => elemento.tipo === 'Retorno dados');
        const registro = registroArray[0]
        for(questionario of registro.questionario){
            linha = linha + 10
            let pergunta = doc.splitTextToSize(questionario.pergunta, larguraMaxima);

            doc.text(pergunta, 10, linha);
            linha = linha + 10
            let resposta = doc.splitTextToSize(questionario.resposta, larguraMaxima);
            doc.text(resposta, 10, linha);
            linha = linha + 10
            linha = linha + 10
            if(linha > 240){
                doc.addPage();
                linha = 10;
            }
                
        }


    }
    
    let document = doc.output()
    return document
}


module.exports = pdfExp