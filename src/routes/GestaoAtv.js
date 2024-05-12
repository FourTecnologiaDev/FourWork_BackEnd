const express = require('express');
const router = express.Router();
const cors = require('cors');
const CadastroApontamento = require('../schema/cadApont')
const crud = require("../crud");
const authenticateToken = require('../authenticate/authenticateToken')
const mongoSchemaCadastro = require('../schema/cadApont')
router.use(cors());

router.post(`/gestaoatv`, async function (req, res) {
  try {
    console.log('Recebendo dados do formulário:', req.body);
    const CadastroApontamento = mongoSchemaCadastro();
    const { codigo, ...outrosDados } = req.body;

    // Verificar se o código RAT já existe no banco de dados
    const codigoExistente = await CadastroApontamento.findOne({ RAT: outrosDados.RAT });
    if (codigoExistente) {
      console.error('Código RAT já existe no banco de dados:', outrosDados.RAT);
      return res.status(400).json({ erro: 'Código RAT já existe no banco de dados.' }).end();
    }

    console.log('Dados a serem inseridos no banco de dados:', { ...outrosDados, codigo });

    const retorno = await crud('CadastroApontamento', { ...outrosDados, codigo }, 'lastCode');
    console.log('Último código inserido:', retorno);

    await crud('CadastroApontamento', { ...outrosDados, codigo }, 'insert');
    console.log('Dados inseridos com sucesso.');

    // Após a conclusão de todas as operações, realizar o redirecionamento
  
  } catch (err) {
    console.error('Erro ao inserir dados no banco de dados:', err);
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});



router.get(`/gestaoatv`, async function (req, res) {
  try {

    const retorno = await crud('CadastroApontamento', {}, 'find');
    res.json(retorno).end();
  } catch (err) {

    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

router.delete('/gestaoatv/:id', authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    console.log('Recebido DELETE em /gestaoatv com ID:', id);
    
    // Chame a função crud passando o nome do modelo, os dados e o tipo de operação
    const retorno = await crud('CadastroApontamento', { _id: id }, 'delete');

    console.log('Item excluído com sucesso:', retorno);
    res.json({ resultado: "Item excluído com sucesso." });
  } catch (err) {
    console.error('Erro ao excluir item:', err);
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` });
  }
});

router.get('/gestaoatv/:codigoRAT', async (req, res) => {
  try {
    const CadastroApontamento = mongoSchemaCadastro();
    const codigoRAT = req.params.codigoRAT;

    // Verificar se o código RAT já existe no banco de dados
    const codigoExistente = await CadastroApontamento.findOne({ RAT: codigoRAT });

    if (codigoExistente) {
      // Se o código RAT existe, retornar um status 200 com um objeto indicando que o código existe
      res.status(200).json({ existe: true });
    } else {
      // Se o código RAT não existe, retornar um status 404 com um objeto indicando que o código não existe
      res.status(200).json({ existe: false });
    }
  } catch (err) {
    console.error('Erro ao verificar existência do código RAT:', err);
    // Se houver um erro, retornar um status 500 com uma mensagem de erro
    res.status(500).json({ erro: 'Erro ao verificar existência do código RAT' });
  }
});

module.exports = router;