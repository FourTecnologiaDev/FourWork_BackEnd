const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer'); // Importar multer para processar formulários multipart/form-data
const mongoSchemaCadastro = require('../schema/cadRat')();
const crud = require("../crud");


router.use(cors());

// Configurar multer para processar o formulário e armazenar o arquivo em memória
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rota para lidar com solicitações POST
router.post(`/rats`, upload.single('Anexo'), async function (req, res) {
  try {
    const { Ratsenior, Stats, Data, Ratcod, Seniorcod } = req.body; // Aqui é onde o erro ocorre
    
    // Extrair os dados binários e o tipo de conteúdo do arquivo enviado
    const Anexo = {
      data: req.file.buffer, // Dados binários do arquivo
      contentType: req.file.mimetype // Tipo de conteúdo do arquivo
    };

    // Criar uma nova instância do modelo CadastroRAT com os dados do formulário
    const novoCadastro = new mongoSchemaCadastro({
      Ratcod, 
      Seniorcod,
      Ratsenior,
      Stats,
      Anexo,
      Data
    });

    // Salvar o novo cadastro no banco de dados
    await novoCadastro.save();
    const retorno = await crud('CadRAT', {}, 'find');
    // Responder ao cliente com uma mensagem de sucesso
    res.json({ retorno: "Inserido com sucesso." }).end();
  } catch (err) {
    // Lidar com erros e responder ao cliente com uma mensagem de erro
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

router.post(`/ratsdowloadpdf`, async function (req, res) {
  try {
    const id = req.body._id;
    const cadastro = await mongoSchemaCadastro.findById(id);

    if (!cadastro) {
      return res.status(404).json({ mensagem: "Cadastro não encontrado." }).end();
    }

    res.set('Content-Type', cadastro.Anexo.contentType);
    res.set('Content-Disposition', `attachment; filename=teste`);
    res.send(cadastro.Anexo.data);
  } catch (err) {
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});


// Rota para lidar com solicitações GET
router.get(`/rats`, async function (req, res) {
  try {
    // Executar as operações necessárias para processar a solicitação GET
    const retorno = await crud('CadRAT', {}, 'find');
    res.json(retorno).end();
  } catch (err) {
    // Lidar com erros e responder ao cliente com uma mensagem de erro
    res.status(500).json({ retorno: `Algo deu errado!, erro: ${err}` }).end();
  }
});

module.exports = router;
