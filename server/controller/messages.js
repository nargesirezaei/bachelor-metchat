const express = require('express');
const app = express();
const messages = require('../services/messages');


app.post('/send', messages.send);

app.get('/getConversation', messages.getConversation);

app.get('/getMessage/:messageId', messages.getMessage);


app.put('/edit', messages.edit);

app.delete('/delete', messages.delete);

app.put('/seen', messages.seen);

app.get('/conversations/:conversationId/messages', async (req, res) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);
  
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
  
    const messages = conversation.messages;
    res.json(messages);
  });
  

module.exports = app;