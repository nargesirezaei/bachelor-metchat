const express = require('express');
const app = express();
const conversations = require('../services/conversations');


app.post(`/`, async (req, res) => {
   //coming soon
});

app.get(``, async (req, res) => {
   //coming soon 
});

app.get(`/:conversationId`, async (req, res) => {
   //coming soon 
});

app.put(`/:conversationId`, async (req, res) => {
   //coming soon 
});

app.delete(`/:conversationId`, async (req, res) => {
   //coming soon
});

module.exports = app;