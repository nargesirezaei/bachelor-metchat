export const WebSocketClient = (url, onMessageCallback, onConnected) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        console.log("WebSocket connection established");
        onConnected(true);
    };

    ws.onmessage = (event) => {
        onMessageCallback(event.data);
    };

    const sendMessage = (message) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    };

    return {
        sendMessage: sendMessage,
        ws,
    };
};
