const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

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
        } catch (error) {
            console.error(error);
        }
    });

    ws.on("close", function close() {
        console.log(`WebSocket connection closed (user ID: ${fromId})`);
        delete clients[fromId];
    });
});
