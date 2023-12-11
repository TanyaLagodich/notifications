const EventEmitter = require('./event-emitter');

class NotificationQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(notification) {
        this.queue.push(notification);
        this.processQueue();
    }

    processQueue() {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        while (this.queue.length > 0) {
            const notification = this.queue.shift();
            EventEmitter.emit('send-to-client', notification);
        }

        this.isProcessing = false;
    }
}

module.exports = new NotificationQueue();
