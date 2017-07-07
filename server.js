//'use strict';
var express = require('express');
var app     = express();
var path    = require('path');
var http	= require('http').Server(app);
var bodyParser = require('body-parser');

console.log('- - - - Iniciando entorno');

// CORS --> Cabeceras correctas
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Parsers --> Poder mandar y recibir JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log('- - - - Middlewares cargados...');

console.log('- - - - FRONT ROUTES');
app.use(express.static(__dirname + '/'));

app.get('/', function (request, response, next) {
	response.sendFile(path.join(__dirname+'/index.html'));
});

console.log('- - - - END FRONT ROUTES');

// SOCKET IO & Stuff
console.log('- - - - SOCKET IO');
var io = require("socket.io")(http); // app or http
var message = [];

io.on('connection', function(socket){
	
	var msg = 'emitiendo';
	socket.emit('msg',msg);

	// KICK Ableton Observer
	test.kickObs(); // EVENT LISTENER => Kick 808 LC Value has change 
	
	/*
	msg = abletonVal;
	socket.on('midi-action', function(data) {
		console.log("Midi Received",msg);
	});
	*/
	
	// STANDARD
	/*
	socket.on('new-message', function(data) {
		//messages.push(data);
		console.log(data.text);
		io.sockets.emit('messages', messages);
	});
	*/
});

// MAX 4 ABLETON
var test = require('./test');

// STARTING SERVER
http.listen(process.env.PORT || 3000, function () {
  console.log('- START SERVER - - - - - -\n');
  console.log('Server Listening on http://localhost:' + (process.env.PORT || 3000))
});