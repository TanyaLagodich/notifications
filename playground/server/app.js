const express = require('express');
const axios = require('axios');
const app = express();

const notificationData = {
    message: 'Новое уведомление',
    // Другие данные уведомления
};

app.get('/notifications', () => {
    axios.post('http://localhost:8000/notification', notificationData)
        .then((response) => {
            console.log('Уведомление успешно отправлено');
        })
        .catch((error) => {
            console.error('Ошибка при отправке уведомления', error);
        });
});
module.exports = app;
