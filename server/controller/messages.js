const express = require("express");
const app = express();
const messages = require("../services/messages");
const { verifyaccess } = require("../services/authorization");

app.post("/init", verifyaccess, messages.init);

app.post("/send", verifyaccess, messages.send);

app.get("/getConversation", verifyaccess, messages.getConversation);

app.get("/getMessage/:messageId", verifyaccess, messages.getMessage);

app.put("/edit", verifyaccess, messages.edit);

app.delete("/delete", verifyaccess, messages.delete);

app.put("/seen", verifyaccess, messages.seen);

module.exports = app;
