const express = require("express");
const { verifyaccess } = require("../services/authorization");
const app = express();
const messages = require("../services/messages");
const adminMessages = require("../services/messagesAdmin");

app.post("/init", verifyaccess, messages.init);

app.post(`/`, verifyaccess, messages.add);

app.get(`/:conversationId`, verifyaccess, messages.getAllMessages);

app.put(`/seen`, messages.seen);

app.delete(`/:messageId`, messages.delete);

app.post("/send", adminMessages.send);

app.get("/getConversation/:conversationId", adminMessages.getConversation);

app.get("/getMessage/:messageId", adminMessages.getMessage);

app.put("/edit", adminMessages.edit);

app.delete("/delete", adminMessages.delete);

app.get("/conversations/:conversationId/messages", async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found" });
  }

  const messages = conversation.messages;
  res.json(messages);
});

module.exports = app;
