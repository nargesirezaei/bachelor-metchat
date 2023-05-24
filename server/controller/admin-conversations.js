const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const conversations = require("../services/conversations");
const adminConversations = require("../services/adminConversations");

app.post(`/get-all`, verifyaccess, adminConversations.getAll);

module.exports = app;
