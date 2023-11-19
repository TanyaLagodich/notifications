const { EventEmitter } = require('events');

class SSE extends EventEmitter {
    constructor() {
        super();
        this.clients = new Map();
    }

    addClient(req, reply) {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
        };
        reply.raw.writeHead(200, headers);

        const userId = req.params.userId;

        if (!userId) {
            // TODO add handling error
        }

        if (!this.clients.has(userId)) {
            this.clients.set(userId, []);
        }

        const clientsArray = this.clients.get(userId);
        clientsArray.push(reply);

        const removeListener = () => {
            const index = clientsArray.indexOf(reply);
            if (index !== -1) {
                clientsArray.splice(index, 1);
                if (clientsArray.length === 0) {
                    this.clients.delete(userId);
                }
            }
        };

        reply.raw.once('close', removeListener);
    }

    sendToClient({ userId, text }) {
        const clientsArray = this.clients.get(userId);

        if (clientsArray) {
            clientsArray.forEach((client) => {
                try {
                    const formattedData = JSON.stringify({ text });
                    client.raw.write(`data: ${formattedData}\n\n`);
                } catch (err) {
                    console.error(err);
                }
            });
        }
    }
}

module.exports = {
    SSE: new SSE(),
};
