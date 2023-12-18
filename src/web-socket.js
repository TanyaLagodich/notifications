// const { WebSocketServer } = require('ws');
const EventEmitter = require('./event-emitter');

class WebSocket {
    constructor() {
        // this.ws = new WebSocketServer({ noServer: true });
        this.clients = new Map();

        EventEmitter.on('send-to-client', ({ userId, text }) => {
            this.sendToClient({ userId, text });
        });


    }

    addClient(connection, req) {
        const userId = req.params.userId;

        if (!userId) {
            // TODO add handling error
        }

        if (!this.clients.has(userId)) {
            this.clients.set(userId, []);
        }

        const clientsArray = this.clients.get(userId);
        clientsArray.push(connection);

        const removeListener = () => {
            const index = clientsArray.indexOf(connection);
            if (index !== -1) {
                clientsArray.splice(index, 1);
                if (clientsArray.length === 0) {
                    this.clients.delete(userId);
                }
            }
        };

        connection.socket.on('close', removeListener);
    }

    sendToClient({ userId, text }) {
        // console.log({ userId, text }, this.clients);
        const clientsArray = this.clients.get(userId);

        if (clientsArray) {
            clientsArray.forEach((client) => {
                try {
                    const formattedData = JSON.stringify({ text });
                    client.socket.send(formattedData);
                } catch (err) {
                    console.error(err);
                }
            });
        }
    }

}

module.exports = new WebSocket();
