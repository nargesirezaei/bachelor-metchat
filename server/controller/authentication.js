const express = require("express");
const app = express();

const authentication = require("../services/authentication");
const { verifyaccess } = require("../services/authorization");

//login will be created on authentication inside the services

app.post(`/user-info`, authentication.userInfo); //ex : authentication/login

///authentication/login ??
app.post(`/login`, authentication.login); //ex : authentication/login

app.post(`/register`, authentication.register);

app.post("/change-password", verifyaccess, authentication.changePassword);

app.post(`/logout`, authentication.logout);

module.exports = app;
