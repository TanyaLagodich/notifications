const NotificationController = require('../controllers');

async function routes(fastify, options) {
    fastify.post('/notification', NotificationController.getNotification);
}

module.exports = routes;
