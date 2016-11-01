var express = require("express");
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var drawnPaths = [];

app.use(express.static('public'));

app.get("/", function(req, res){
	req.render("index.html");
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit("history", drawnPaths);
	socket.on('path', function(msg){
		drawnPaths.push(msg);
		socket.broadcast.emit('path', msg);
	})
});

app.get("/foo", function(req, res){
	res.send("This is the foo route");
});


http.listen(3000, function(){
	console.log("Listening on port 3000");
});