const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const interests = require("../services/interests");

//create new intrest
app.post(`/`,verifyaccess, interests.create);

//fetch all interests
app.get(`/`,verifyaccess, interests.getAll);

//ex fetch from intrests row with id  number 2
app.get(`/:interestId`,verifyaccess,  interests.get);

//update one row with specific id
app.put(`/:interestId`,verifyaccess, interests.update);

app.delete(`/:interestId`,verifyaccess, interests.delete);

module.exports = app;