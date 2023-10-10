const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routers = require('./routers');

app.use(bodyParser.json());
app.use(routers)

module.exports = app;
