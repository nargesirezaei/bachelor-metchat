const express = require('express');
const app = express();
const messages = require('../services/messages');


app.post('/create', messages.create);

app.get('/getConversation', messages.getConversation);

app.get('/getMessage/:messageId', messages.getMessage);

app.post('/seen', async (req, res) => {
    //updating
   
});

app.put('/edit', messages.edit);

app.delete('/delete', messages.delete);

app.put(`/seen`, messages.seen);

module.exports = app;