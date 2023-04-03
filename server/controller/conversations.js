const express = require('express');
const app = express();
const conversations = require('../services/conversations');


app.post('/create', conversations.create);

/*
app.get(``, async (req, res) => {
   //coming soon 
});
*/

/*
app.get(`/:conversationId`, async (req, res) => {
   //coming soon 
});
*/

/*
app.put(`/:conversationId`, async (req, res) => {
   //coming soon 
});
*/

app.put('/editTitle', conversations.editTitle);

app.delete('/delete/id', conversations.deleteById);
app.delete('/delete/names', conversations.deleteByName);

module.exports = app;