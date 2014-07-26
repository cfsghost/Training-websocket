var http = require('http');
var express = require('express');
var WebSocket = require('websocket');

var app = express();


var server = http.createServer(app).listen(8000, function() {
	console.log('Running');
});

var wsServer = new WebSocket.server({
	httpServer: server,
	autoAcceptConnections: false
});

wsServer.on('request', function(req) {
	 var connection = req.accept('echo-protocol', req.origin);

	connection.sendUTF('Hi Client');

	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			console.log('Received Message: ' + message.utf8Data);
			connection.sendUTF(message.utf8Data);
		} else if (message.type === 'binary') {
			console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
			connection.sendBytes(message.binaryData);
		}
	});

	connection.on('close', function() {
		console.log('close');
	});
});

