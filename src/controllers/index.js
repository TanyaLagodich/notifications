const notificationQueue = require('../notification-queue');

class NotificationController {
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

module.exports = new NotificationController();
