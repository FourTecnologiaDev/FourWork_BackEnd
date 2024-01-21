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

    // Mascarar dados
    if(operacao == 'mascarar'){
        registro.crm = '**********';
        registro.cpf = '**********';
        registro.cep = '**********';
        registro.endereco = '**********';
        registro.numero = '**********';
        registro.endereco2 = '**********';
        registro.cidade = '**********';
        registro.estado = '**********';
        registro.email = '**********';
        registro.tel = '**********';
        registro.whats = '**********';
        registro.nascimento = '**********';
        registro.identidade = '**********';
        registro.passporte = '**********';
        registro.complemento = '**********';
        
        json = JSON.stringify({"codigoEvento": registro.codigoEvento});
        filter = JSON.parse(json);
        modelo.updateMany(filter, registro).exec();  
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

    // Insere multiplos registro
    if(operacao == 'insertMany'){
        resultado = await modelo.insertMany(registro);
    }

    // Atualiza registro
    if(operacao == 'update'){        
        id = registro._id;
        json = JSON.stringify({"_id": id});
        var filter = JSON.parse(json);
        delete registro.codigo;
        
        if(registro.historico){
            resultado = modelo.findByIdAndUpdate(id,{$addToSet: { historico: registro.historico[0] } }).exec();
            delete registro.historico;           
            modelo.findOneAndUpdate(filter, registro).exec();
        }
        else {
            delete registro._id
            resultado = modelo.findOneAndUpdate(filter, registro).exec();  
        }
    }
        // Atualiza registro arrays participantes
        if(operacao == 'updateArrays'){        
            let id = registro._id;
            if(registro._id)
                delete registro._id
            let array = Object.keys(registro)
            //resultado = modelo.findByIdAndUpdate(id,{$addToSet: { aereo: registro.aereo } }).exec();                
            resultado = modelo.findByIdAndUpdate(id,{ $set: { aereo: registro.aereo } },  { new: false }).exec();              
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
        resultado = modelo.find({"email": registro.email, "password": registro.password});        
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
  