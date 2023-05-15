const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const conversations = require("../services/conversations");

app.post(`/`, verifyaccess, conversations.add);

app.post(`/get-all`, verifyaccess, conversations.getAll);

app.get(`/:conversationId`, verifyaccess, conversations.get);

app.delete(`/:conversationId`, verifyaccess, conversations.delete);

app.put("/:conversationId", verifyaccess, conversations.finish);

module.exports = app;
