const express = require("express");
const app = express();

const authentication = require("../services/authentication");
const { verifyaccess } = require("../services/authorization");

//login will be created on authentication inside the services

///authentication/login ??
app.post(`/login`, authentication.login); //ex : authentication/login

app.post(`/register`, authentication.register);

app.post("/change-password",verifyaccess,authentication.changePassword);

module.exports = app;
