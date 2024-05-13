/**
 * 
 * @param {*} tabela - Collection que será utilizada 
 * @param {*} registro - Json com os dados que serão utilizados na operação 
 * @param {*} operacao - Operação a ser realizada (Insert, Update, Delete, Find)
 * @returns 
 */
async function crud(tabela, registro, operacao) {

    const mongoose = require("mongoose", "ObjectId" );
    var modelo = mongoose.model(tabela);
    var resultado = '';
    var id = '';
    if(registro){
        if(registro.codigo != undefined)
            var codigo = parseInt(registro.codigo);  
        if(registro._id != undefined)
            id = registro._id
    }else{
        var codigo = 1;
    }      


    // Busca registro
    if(operacao == 'find'){
        resultado = await modelo.find(registro).sort({"codigo" : 1}).lean().exec();
    }
    
    // Apaga registro
    if(operacao == 'delete'){
        if(registro.historico){
            modelo.findByIdAndUpdate(id,{ $pull: { historico: registro.historico[0] } }).exec();
            delete registro.historico;           
            modelo.findOneAndUpdate(filter, registro).exec();
        }else{
            resultado = modelo.deleteOne(registro).exec();
        }
    }

    // Insere registro
    if(operacao == 'insert'){
        //await crud(tabela, '','lastCode')
        new modelo(registro).save();
    }
    
    // Busca ultimo registro
    if(operacao == 'lastCode'){
        resultado = modelo.find({},{"_id":0, "codigo":1}).sort({codigo:-1}).limit(1).lean().exec();
    }

    // Busca proximo registro
    if(operacao == 'next'){  
        resultado = modelo.find({"codigo":{$gt:codigo}}).sort({codigo:1}).limit(1).lean().exec();
    }

    // Busca registro anterior
    if(operacao == 'previous'){
        resultado = modelo.find({"codigo":{$lt:codigo}}).sort({codigo:-1}).limit(1).limit(1).lean().exec();
    }

    // Busca login
    if(operacao == 'authenticate'){
        resultado = modelo.find({"email": registro.email, "senha": registro.senha});        
    }

    // Cria usuario
    if(operacao == 'newUser'){
        if(registro.email){
            resultado = await modelo.find({"email": registro.email})
            if(resultado.length > 0){
                return resultado = {"result": "Usuário já existe na base."};
            }else{
                new modelo(registro).save()
                return resultado = {"result": "Usuário inserido com sucesso."};
            }
        }
    }
     
    return resultado;
    }  

    module.exports = crud;
  