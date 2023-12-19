const NotificationController = require('../controllers/notifications');
const WebSocketController = require('../controllers/web-socket');
const checkDomain = require('../middlewares/check-domain');

async function routes(fastify) {
    fastify.post('/notification', { schema: NotificationController.schema, preHandler: checkDomain }, NotificationController.getNotification);
    fastify.get('/websocket/:userId', { websocket: true }, WebSocketController.addClient);
}

module.exports = routes;
