let clients = {};

function eventsHandler(req, reply, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    };
    reply.raw.writeHead(200, headers);

    const userId = req.params.userId;

    if (!clients[userId]) {
        clients[userId] = [];
    }

    // Добавьте новый клиент в список для данного userId
    clients[userId].push(reply);

    req.raw.on('close', () => {
        console.log('CLOSE');
        delete clients[userId];
    });

}

function sendToClient({ userId, notificationType }) {
    if (clients[userId]) {
        const formattedData = JSON.stringify({notificationType});
        clients[userId].forEach((client) => {
            client.raw.write(`data: ${formattedData}\n\n`);
        });
    }
}

module.exports = {
    eventsHandler,
    sendToClient,
};
