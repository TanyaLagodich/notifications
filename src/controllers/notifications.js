const notificationQueue = require('../notification-queue');

class Notifications {
    constructor() {
        this.schema = {
            body: {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    text: { type: 'string' },
                },
                required: ['userId', 'text'],
            },
        };
    }
    getNotification(req, res) {
        try {
            const notificationData = req.body;
            notificationQueue.enqueue(notificationData);
            res.send('Уведомление получено');
        } catch (err) {
            console.log({ err });
            res.send(err);
        }

    }
}

module.exports = new Notifications();
