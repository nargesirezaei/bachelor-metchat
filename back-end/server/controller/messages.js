const express = require('express');
const { verifyaccess } = require('../services/authorization');
const app = express();
const messages = require('../services/messages');


app.post(`/`,verifyaccess, messages.add);

app.get(`/:conversationId`,verifyaccess,messages.getAllMessages);

app.put(`/seen`, messages.seen);

app.delete(`/:messageId`,messages.delete);

module.exports = app;