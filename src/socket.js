const { Server } = require('socket.io');
const eventEmitter = require('./eventEmitter');

class webSocketManager {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });

            eventEmitter.on('send-notification', (data) => {
                socket.emit('send-notification', data);
            })
        })
    }
}

module.exports = webSocketManager;
