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

app.put('/edit', conversations.editTitle);

app.delete(`/delete`, conversations.delete);

module.exports = app;