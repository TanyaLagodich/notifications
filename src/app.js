const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const eventEmitter = require('./eventEmitter');

app.use(bodyParser.json());

app.post('/notification', (req, res) => {
    // Получите данные уведомления из запроса
    const notificationData = req.body;

    // Обработайте уведомление, выполните необходимые действия
    console.log('Получено уведомление:', notificationData);

    eventEmitter.emit('send-notification', notificationData);

    // Отправьте подтверждение, если это необходимо
    res.status(200).send('Уведомление получено');
});

module.exports = app;
