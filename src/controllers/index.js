const { SSE } = require('../sse');

class NotificationController {
    getNotification(req, res) {
        try {
            const notificationData = req.body;
            SSE.sendToClient(notificationData);
            res.send('Уведомление получено');
        } catch (err) {
            console.log({ err });
            res.send(err);
        }

    }
}

module.exports = new NotificationController();
