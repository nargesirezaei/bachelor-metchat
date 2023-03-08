const express = require("express");
const app = express();
const interests = require("../services/interests");


app.post(`/`, (req, res) => {
   //coming soon 
   //create new intrest
});

app.get(`/`, async (req, res) => {
   //coming soon
   //fetch all interests
});

app.get(`/:interestId`,  (req, res) => {
   //coming soon
   //ex fetch from intrests row with id  number 2
});

app.put(`/`, async (req, res) => {

  //coming soon
   //update one row with specific id
});

app.delete(`/:id`, async (req, res) => {
   //coming soon 
});

module.exports = app;