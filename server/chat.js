const WebSocket = require("ws");
const User = require("./models/user");

const wss = new WebSocket.Server({ port: 8000 });

// A dictionary to map user IDs to WebSocket instances
const clients = {};

wss.on("connection", function connection(ws) {
    let userId = "";
    ws.on("message", function incoming(message) {
        try {
            const parsedMessage = JSON.parse(message);
            const recipientId = parsedMessage.recipientId;
            userId = parsedMessage.userId;
            const content = parsedMessage.message;

            // Update the clients object for the current user
            clients[userId] = ws;

            // Send the message to the recipient
            const recipient = clients[recipientId];
            if (
                recipient !== undefined &&
                recipient.readyState === WebSocket.OPEN
            ) {
                recipient.send(
                    JSON.stringify({ content, recipientId, userId })
                );
            }

            // Send the message back to the sender
            const user = clients[userId];
            if (user !== undefined && user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify({ content, recipientId, userId }));
            }
        } catch (error) {
            console.error(error);
        }
    });

    ws.on("close", function close() {
        console.log(`WebSocket connection closed (user ID: ${userId})`);
        delete clients[userId];
    });
});
