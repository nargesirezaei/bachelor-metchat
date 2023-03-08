const express = require('express');
const app = express();

const contacts = require('../services/contacts');


app.post("/assign-contact", async (req, res) => {

    //coming soon 
    
});



app.post("/un-assign-contact", async (req, res) => {
    
    //coming soon
});

app.get("/", async (req, res) => {

   //coming soon 
});

module.exports = app;




