const fastify = require('fastify')({ logger: true });
const notificationRoutes = require('./routers');
const cors = require('@fastify/cors');

fastify.register(require('@fastify/websocket'))

fastify.register(cors, {
    origin: "*",
    methods: ['POST', 'GET'],
});
fastify.register(notificationRoutes);

module.exports = fastify;
