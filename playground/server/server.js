require('dotenv').config();
const http = require('http');
const axios = require('axios');
const app = require('./app');
const PORT = process.env.PORT || 3000;

const notificationData = {
    message: 'Новое уведомление',
    // Другие данные уведомления
};


const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

axios.post('http://localhost:8000/notification', notificationData)
    .then((response) => {
        console.log('Уведомление успешно отправлено');
    })
    .catch((error) => {
        console.error('Ошибка при отправке уведомления', error);
    });
