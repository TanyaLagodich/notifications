const NotificationController = require('../controllers');
const WebSocket = require('../web-socket');

async function routes(fastify) {
    fastify.post('/notification', NotificationController.getNotification);
    fastify.get('/websocket/:userId', { websocket: true }, WebSocket.addClient.bind(WebSocket));
}

module.exports = routes;
