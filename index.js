const express = require('express');
const app = express();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// Use the 'trust proxy' setting to capture client's IP behind proxy
app.set('trust proxy', true);

// Initialize the Telegram Bot with your bot token
const bot = new TelegramBot('6716327087:AAHZDYmz6vsrVKX5QfE35FB2hwJ53XospC0', { polling: false });

app.use((req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for']; // Capture client's IP
    console.log(`IP-адрес посетителя: ${clientIp}`);
    next();
});

app.get('/order/bitrix24/Bayakhmeto', async (req, res) => {
    const clientIp = req.ip || req.headers['x-forwarded-for']; // Capture client's IP

    // Send a message to the Telegram bot when this route is accessed
    bot.sendMessage('565711735', `New order accessed by client with IP: ${clientIp}`)
        .then(() => {
            console.log('Order information sent to Telegram bot');
        })
        .catch((error) => {
            console.error('Error sending order info to Telegram bot:', error);
        });

    const imageUrl = 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg';

    // Render an HTML page with the image
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, minimum-scale=0.1">
        </head>
        <body>
            <img src="${imageUrl}" alt="Example Image" style="max-width: 100%;">
        </body>
        </html>
    `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
