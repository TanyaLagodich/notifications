const eventEmitter = require('../eventEmitter');

class NotificationController {
    getNotification(req, res) {
        try {
            const notificationData = req.body;
            console.log('Получено уведомление:', notificationData);

            eventEmitter.emit('send-notification', notificationData);

            res.status(200).send('Уведомление получено');
        } catch (err) {
            res.status(500).json(err);
        }

    }
}

module.exports = new NotificationController();
