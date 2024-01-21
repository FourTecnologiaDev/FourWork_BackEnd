
function expCsv(body) {
    const fileCsv = [];

    let linha = String(body).split("\n");
    for (var cont = 10; linha.length > cont; cont++) {
        let conteudo = String(linha[cont]).split(";");
        let registro = {};
        registro.data = conteudo[0];
        registro.historico = conteudo[1];
        registro.valor = conteudo[2];
        registro.saldo = conteudo[3];
        fileCsv.push(registro);
    }
    return fileCsv;
}
module.exports = expCsv;