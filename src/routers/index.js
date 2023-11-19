const NotificationController = require('../controllers');
const { SSE } = require('../sse');

async function routes(fastify, options) {
    fastify.post('/notification', NotificationController.getNotification);
    fastify.get('/events/:userId', { serverSentEvents: true }, SSE.addClient.bind(SSE));
}

module.exports = routes;
