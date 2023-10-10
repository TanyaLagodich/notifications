require('dotenv').config();
const http = require('http');
const app = require('./app');
const webSocketManager = require('./socket');
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
new webSocketManager(server);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
