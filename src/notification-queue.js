const EventEmitter = require('./event-emitter');
const LinkedList = require('./linked-list');

class NotificationQueue {
    constructor() {
        this.linkedList = new LinkedList();
        this.isProcessing = false;
    }

    enqueue(notification) {
        this.linkedList.push(notification);
        this.processQueue();
    }

    processQueue() {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        while (!this.linkedList.isEmpty()) {
            const { value } = this.linkedList.shift();
            EventEmitter.emit('send-to-client', value);
            // new Promise(() => {
            //     EventEmitter.emit('send-to-client', notification);
            // }).then().catch((err) => console.error(err));
        }

        this.isProcessing = false;
    }
}

module.exports = new NotificationQueue();
