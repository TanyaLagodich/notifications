const fastify = require('fastify')({ logger: true });
const notificationRoutes = require('./routers');
const cors = require('@fastify/cors');

fastify.register(cors);
fastify.register(notificationRoutes);

module.exports = fastify;
