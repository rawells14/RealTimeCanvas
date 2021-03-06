var express = require("express");
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var drawnPaths = [];

app.use(express.static('public'));
app.set("port", process.env.PORT || 3000);
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

http.listen(app.get("port"), function(){
	console.log("Listening on port 3000");
});
