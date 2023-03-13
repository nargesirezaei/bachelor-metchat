const express = require('express');
const app = express();

const authentication = require('../services/authentication');

//login will be created on authentication inside the services

///authentication/login ??
app.post(`/login`,  authentication.login);   //ex : authentication/login

app.post(`/register`, authentication.register);


module.exports = app;