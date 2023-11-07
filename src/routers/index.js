const NotificationController = require('../controllers');
const { eventsHandler } = require('../eventsHandler');

async function routes(fastify, options) {
    fastify.post('/notification', NotificationController.getNotification);
    fastify.get('/events/:userId', { serverSentEvents: true }, eventsHandler);
}

module.exports = routes;
