const express = require('express');
const { verifyaccess } = require('../services/authorization');
const app = express();

const bio = require('../services/bio');

app.post("/:userId", bio.editProfile)

module.exports = app;

