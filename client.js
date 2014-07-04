var WebSocket = require('websocket');

var client = new WebSocket.client();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {

	console.log('WebSocket client connected');
	connection.on('error', function(error) {
		console.log("Connection Error: " + error.toString());
	});

	connection.on('close', function() {
		console.log('echo-protocol Connection Closed');
	});

	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log("Received: '" + message.utf8Data + "'");
		}
	});

	connection.sendUTF('Hello');
});

client.connect('ws://localhost:8000/', 'echo-protocol');
