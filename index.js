const express = require('express');
const app = express();
const request = require('request'); // Установите пакет request, если его нет

app.use((req, res, next) => {
    const clientIp = req.ip; // Получаем полный IP-адрес посетителя
    console.log(`IP-адрес посетителя: ${clientIp}`);
    next();
});

app.get('/', (req, res) => {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kazdream_logo.svg/750px-Kazdream_logo.svg.png';

    // Загрузить изображение по ссылке
    request.get(imageUrl, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            // Установить заголовки для отправки изображения
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Content-Disposition', 'inline; filename=your_image.jpg');

            // Отправить изображение в ответе
            res.send(body);
        } else {
            console.error(error);
            res.status(500).send('Ошибка загрузки изображения');
        }
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
