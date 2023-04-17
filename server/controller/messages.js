const express = require('express');
const app = express();
const messages = require('../services/messages');


app.post('/send', messages.send);

app.get('/getConversation', messages.getConversation);

app.get('/getMessage/:messageId', messages.getMessage);


app.put('/edit', messages.edit);

app.delete('/delete', messages.delete);

app.put('/seen', messages.seen);

module.exports = app;