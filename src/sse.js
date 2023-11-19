// let clients = {};
//
// function eventsHandler(req, reply, next) {
//     const headers = {
//         'Content-Type': 'text/event-stream',
//         'Connection': 'keep-alive',
//         'Cache-Control': 'no-cache',
//         'Access-Control-Allow-Origin': '*',
//     };
//     reply.raw.writeHead(200, headers);
//
//     const userId = req.params.userId;
//
//     if (!userId) {
//         // TODO add handling error
//     }
//
//     if (!clients[userId]) {
//         clients[userId] = [];
//     }
//     clients[userId].push(reply);
//
//     req.raw.on('close', () => {
//         delete clients[userId];
//     });
//
// }
//
// function sendToClient({ userId, text }) {
//     if (clients[userId]) {
//         clients[userId].forEach((client) => {
//             try {
//                 const formattedData = JSON.stringify({text});
//                 client.raw.write(`data: ${formattedData}\n\n`);
//             } catch (err) {
//                 console.error(err);
//             }
//         });
//     }
// }
//
// module.exports = {
//     eventsHandler,
//     sendToClient,
// };

const { EventEmitter } = require('events');

class SSE extends EventEmitter {
    clients = {};
    constructor() {
        super();
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

        if (!this.clients[userId]) {
            this.clients[userId] = [];
        }
        this.clients[userId].push(reply);

        const removeListener = () => {
            delete this.clients[userId];
        };

        reply.raw.once('close', removeListener);
    }

    sendToClients(data) {
        this.clients.forEach((client) => {
            client.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    }

    sendToClient({ userId, text }) {
        if (this.clients[userId]) {
            this.clients[userId].forEach((client) => {
                try {
                    const formattedData = JSON.stringify({text});
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
