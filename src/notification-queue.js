const EventEmitter = require('./event-emitter');
const LinkedList = require('./linked-list');

class NotificationQueue {
    constructor() {
        this.linkedList = new LinkedList();
        this.maxConcurrent = 4;
        this.queue = [];
    }

    enqueue(notification) {
        // this.queue.push(notification);
        this.linkedList.push(notification);
        this.processQueue();
    }

    async processQueue() {
        const notificationsToProcess = this.linkedList.shiftMultiple(this.maxConcurrent);
        const promises = notificationsToProcess.map(({ value }) => this.handleNotification(value));
        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error processing notifications:', error);
        } finally {
            if (!this.linkedList.isEmpty()) {
                this.processQueue();
            }
        }
    }

    async handleNotification(notification) {
        return new Promise((resolve, reject) => {
            EventEmitter.emit('send-to-client', notification, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = new NotificationQueue();
