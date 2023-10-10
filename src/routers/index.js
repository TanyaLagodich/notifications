const { Router } = require('express');
const NotificationController = require('../controllers');

const api = Router();

api.post('/notification', NotificationController.getNotification);

module.exports = api;
