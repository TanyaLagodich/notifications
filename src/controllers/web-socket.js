const EventEmitter = require('../event-emitter');
const ClientsModel = require('../models/clients');

class WebSocket {
    constructor() {
        EventEmitter.on('send-to-client', ({ userId, text }) => {
            this.sendToClient({ userId, text });
        });
    }

    addClient(connection, req) {
        const { userId } = req.params;

        if (!userId) {
            connection.socket.close(4001, 'User ID is missing');
            return;
        }

        ClientsModel.addClient(userId, connection);
        connection.socket.on('close', () => ClientsModel.removeConnection(userId, connection));
    }

    sendToClient({ userId, text }) {
        const clientConnections = ClientsModel.getClientConnections(userId);

        if (clientConnections) {
            clientConnections.forEach((client) => {
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
