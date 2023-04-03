const express = require('express');
const { verifyaccess } = require('../services/authorization');
const app = express();
const userInterests = require('../services/user-interest');


app.post(`/`,verifyaccess, userInterests.create);

app.get(`/`,verifyaccess, userInterests.getAll);

app.delete(`/`,verifyaccess, userInterests.delete);

module.exports = app;