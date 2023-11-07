const eventEmitter = require('../eventEmitter');
const clients = require('../clients');
const { sendToClient } = require('../eventsHandler');

class NotificationController {
    getNotification(req, res) {
        const userId = req.body.userId;
        const notificationType = req.body.notificationType;

        try {
            const notificationData = req.body;
            console.log('Получено уведомление:', notificationData, clients);

            sendToClient({ userId, notificationType });

            // eventEmitter.emit('send-notification', notificationData);

            res.send('Уведомление получено');
        } catch (err) {
            console.log({ err });
            res.send(err);
        }

    }
}

module.exports = new NotificationController();
