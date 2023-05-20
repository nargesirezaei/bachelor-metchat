const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const conversations = require("../services/conversations");
const adminConversations = require("../services/conversationsAdmin");

app.post(`/`, verifyaccess, conversations.add);

app.post(`/get-all`, verifyaccess, conversations.getAll);

app.get(`/:conversationId`, verifyaccess, conversations.get);

app.delete(`/:conversationId`, verifyaccess, conversations.delete);

app.put("/:conversationId", verifyaccess, conversations.finish);

app.post("/create", adminConversations.create);

app.get("/conversations/:userId", adminConversations.conversations);
app.get("/getAllConversations", adminConversations.getAllConversations);
app.put("/editTitle", adminConversations.editTitle);

app.delete("/delete/id", adminConversations.deleteById);
app.delete("/delete/names", adminConversations.deleteByName);

module.exports = app;
