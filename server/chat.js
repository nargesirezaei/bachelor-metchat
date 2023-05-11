const WebSocket = require("ws");
const User = require("./models/user");
const Conversations = require("./models/conversations");
const Messages = require("./models/messages");

const wss = new WebSocket.Server({ port: 8000 });

// A dictionary to map user IDs to WebSocket instances
const clients = {};

wss.on("connection", function connection(ws) {
    let fromId = "";
    ws.on("message", async function incoming(message) {
        try {
            const parsedMessage = JSON.parse(message);
            const toId = parsedMessage.toId;
            fromId = parsedMessage.fromId;
            const content = parsedMessage.message;
            const conversationId = parsedMessage.conversationId;

            // Update the clients object for the current user
            clients[fromId] = ws;

            await Messages.create({
                conversationId: conversationId,
                fromId: fromId,
                toId: toId,
                message: content,
            });

            // Send the message to the recipient
            const recipient = clients[toId];
            if (
                recipient !== undefined &&
                recipient.readyState === WebSocket.OPEN
            ) {
                recipient.send(
                    JSON.stringify({ message: content, toId, fromId })
                );
            }

            // Send the message back to the sender
            const user = clients[fromId];
            if (user !== undefined && user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify({ message: content, toId, fromId }));
            }
        } catch (error) {
            console.error(error);
        }
    });

    ws.on("close", function close() {
        console.log(`WebSocket connection closed (user ID: ${fromId})`);
        delete clients[fromId];
    });
});
