enviaEmailSuporte = (modalData) => {
  const nodemailer = require('nodemailer');

  // Configurações do servidor de e-mail (use as configurações do seu provedor de e-mail)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor SMTP do seu provedor de e-mail
    port: 587, // Porta do servidor SMTP (587 é uma porta comum para TLS)
    secure: false, // true para 465, false para outras portas
    auth: {
      user: 'pedrooofreitas@gmail.com', // Seu endereço de e-mail
      pass: 'phja npqu vteb itta', // Sua senha de e-mail
    }
  });

  // Conteúdo do e-mail com base nos dados do modal
  const mailOptions = {
    from: 'pedrotortoriello4s@gmail.com', // O endereço de e-mail do remetente
    to: 'pedrooofreitas@gmail.com', // O endereço de e-mail do destinatário
    subject: 'Suporte Four', // O assunto do e-mail
    html: `<!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Suporte Four - Pedido de Assistência</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    p {
                        color: #555;
                        margin-bottom: 20px;
                    }
                    .data {
                        margin-bottom: 20px;
                        padding: 10px;
                        background-color: #f9f9f9;
                        border-radius: 5px;
                    }
                    .data p {
                        margin: 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Suporte Four - Pedido de Assistência ${modalData.codigo} 🍀</h1>
                    <p>Prezado(a) equipe de suporte,</p>
                    <div class="data">
                        <p><strong>Email:</strong> ${modalData.email}</p>
                        <p><strong>Sistema:</strong> ${modalData.sistema}</p>
                        <p><strong>Pergunta:</strong> ${modalData.question}</p>
                    </div>
                </div>
            </body>
            </html>` // O corpo do e-mail com os dados do modal em formato HTML
  };

  // Envie o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso! Detalhes:', info);
    }
  });
};

module.exports = enviaEmailSuporte;
