const express = require('express');
const path = require('path');
const app = express();
const TelegramBot = require('node-telegram-bot-api');

// Initialize the Telegram Bot with your bot token
const bot = new TelegramBot('6716327087:AAHZDYmz6vsrVKX5QfE35FB2hwJ53XospC0', { polling: false });

// Use the 'trust proxy' setting to capture client's IP behind proxy
app.set('trust proxy', true);

// Static route to serve images and other static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// Middleware to log and send client IP to Telegram
app.use((req, res, next) => {
    const clientIp = req.ip || req.headers['x-forwarded-for']; // Capture client's IP
    console.log(`IP-адрес посетителя: ${clientIp}`);

    // Send the client's IP address to your Telegram bot
    bot.sendMessage('565711735', `Client IP: ${clientIp} accessed /order/bitrix24/Bayakhmeto`)
        .then(() => {
            console.log('IP sent to Telegram bot');
        })
        .catch((error) => {
            console.error('Error sending IP to Telegram bot:', error);
        });

    next();
});

// Route to serve the order page
app.get('/order/bitrix24/Bayakhmeto', (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/static/MainAfter.jpg`; // Image hosted on your server

    // Render an HTML page with Open Graph meta tags
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, minimum-scale=0.1">
            <meta property="og:title" content="Order Page" />
            <meta property="og:description" content="Check out this awesome order!" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:url" content="${req.protocol}://${req.get('host')}${req.originalUrl}" />
            <meta name="twitter:card" content="summary_large_image" />
            <title>Order Page</title>
        </head>
        <body>
            <h1>Welcome to the Order Page</h1>
            <p>Check out the image below:</p>
            <img src="${imageUrl}" alt="Example Image" style="max-width: 100%;">
        </body>
        </html>
    `);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
