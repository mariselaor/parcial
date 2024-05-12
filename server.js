const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.post('/send-email', async (req, res) => {
    let { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'javier20acc@gmail.com',
            pass: '16javiermusic'
        }
    });

    let mailOptions = {
        from: 'javier13coc@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.json({ message: 'Correo enviado!', info });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el correo.', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
