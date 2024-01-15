const express = require('express');
const app = express();
const axios = require('axios'); // Установите пакет axios, если его нет

app.use((req, res, next) => {
    const clientIp = req.ip; // Получаем полный IP-адрес посетителя
    console.log(`IP-адрес посетителя: ${clientIp}`);
    next();
});

app.get('/', async (req, res) => {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kazdream_logo.svg/750px-Kazdream_logo.svg.png';

    try {
        // Выполнить GET-запрос с помощью axios
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Установить заголовки для отправки изображения
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'inline; filename=your_image.jpg');

        // Отправить изображение в ответе
        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка загрузки изображения');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

module.exports = app;
