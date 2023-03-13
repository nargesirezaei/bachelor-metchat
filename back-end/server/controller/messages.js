const express = require('express');
const app = express();
const messages = require('../services/messages');


app.post(`/`, async (req, res) => {
   //creating
});

app.get(`/`, async (req, res) => {
   //
});

app.post(`/seen`, async (req, res) => {
    //updating
   
});

app.get(`/:messageId`, async (req, res) => {
    
});

app.put(`/`, async (req, res) => {
    
});

app.delete(`/`, async (req, res) => {
   
});

module.exports = app;