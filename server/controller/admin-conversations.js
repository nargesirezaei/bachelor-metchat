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

module.exports = app;
