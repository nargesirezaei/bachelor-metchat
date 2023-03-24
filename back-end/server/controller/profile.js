const express = require('express');
// const { verifyaccess } = require('../services/authorization');
const app = express();

const profile = require('../services/profile');

app.post("/create", profile.create);

app.post("/edit", profile.edit);

module.exports = app;
