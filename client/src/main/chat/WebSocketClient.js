export const WebSocketClient = (url, onMessageCallback) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
        console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
        console.log(event.data);
        onMessageCallback(event.data);
    };

    const sendMessage = (message) => {
        ws.send(JSON.stringify(message));
    };

    return {
        sendMessage: sendMessage,
    };
};
