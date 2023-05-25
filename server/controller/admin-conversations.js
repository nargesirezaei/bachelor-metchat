const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const conversations = require("../services/conversations");
const adminConversations = require("../services/adminConversations");

app.post(`/get-all`, verifyaccess, adminConversations.getAll);

app.post(
  `/delete-all-conversations`,
  verifyaccess,
  adminConversations.deleteAllConversations
);
app.delete(
  `/delete-all-conversations`,
  verifyaccess,
  adminConversations.deleteAllConversations
);

app.get(
  `/getConversation/:conversationId`,
  verifyaccess,
  adminConversations.getConversation
);
app.post(`/all-users`, verifyaccess, adminConversations.allUsers);

app.post(`/delete-user`, verifyaccess, adminConversations.deleteUser);

app.post(`/get-user`, verifyaccess, adminConversations.getUser);

app.post(`/all-users`, verifyaccess, adminConversations.allUsers);

app.post(`/delete-user`, verifyaccess, adminConversations.deleteUser);

app.post(`/get-user`, verifyaccess, adminConversations.getUser);

module.exports = app;
