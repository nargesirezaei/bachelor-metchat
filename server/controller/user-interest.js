const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const userInterests = require("../services/user-interest");

app.post(`/create`, verifyaccess, userInterests.create);

app.get(`/getAll`, verifyaccess, userInterests.getAll);

app.delete(`/delete`, verifyaccess, userInterests.delete);

module.exports = app;
