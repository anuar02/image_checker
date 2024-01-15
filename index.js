const express = require('express');
const app = express();
const fs = require('fs');

app.use((req, res, next) => {
    const clientIp = req.ip; // Получаем полный IP-адрес посетителя
    console.log(`IP-адрес посетителя: ${clientIp}`);
    next();
});

app.get('/', (req, res) => {
    // Прочитать изображение из файла
    fs.readFile('img.png', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка сервера');
        }

        // Установить заголовки для отправки изображения
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Disposition', 'inline; filename=your_image.jpg');

        // Отправить изображение в ответе
        res.send(data);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
