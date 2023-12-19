class ClientModel {
    constructor() {
        this.clients = new Map();
    }

    addClient(userId, connection) {
        if (!this.clients.has(userId)) {
            this.clients.set(userId, []);
        }

        const clientsArray = this.clients.get(userId);
        clientsArray.push(connection);
    }

    getClientConnections(userId) {
        return this.clients.get(userId) || [];
    }

    removeConnection(userId, connection) {
        const clientConnection = this.getClientConnections(userId);
        const index = clientConnection.indexOf(connection);
        if (index !== -1) {
            clientConnection.splice(index, 1);
            if (!clientConnection.length) {
                this.clients.delete(userId);
            }
        }
    }
}

module.exports = new ClientModel();
