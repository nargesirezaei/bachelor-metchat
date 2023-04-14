const express = require('express');
const { verifyaccess } = require('../services/authorization');
const app = express();
const conversations = require('../services/conversations');




app.post(`/`,verifyaccess, conversations.add);

//print all conversations 
app.get(`/`,verifyaccess,conversations.getAll);

//all conversation user had
app.get(`/:conversationId`, verifyaccess,conversations.get);

//delete a conversation 
app.delete(`/:conversationId`,verifyaccess, conversations.delete);

//finish a conversation 
app.put('/:conversationId',verifyaccess,conversations.finish);

//print all conversation only admin can do it.
app.get('/conversations', verifyaccess, conversations.printAllConversations)

module.exports = app;