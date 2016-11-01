var socket = io();

socket.on('path', function(msg){
	receivePath(msg);

})
socket.on('history', function(msg){
	for(var i = 0; i < msg.length; i++){
		receivePath(msg[i]);
	}
	console.log("Current Array Size:"+msg.length);
})


var canvas, ctx = null;
var prevX, prevY, currX, currY = 0;
var isMouseDown = false;


function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	fitCanvas();
	canvas.addEventListener("mousemove", findPath);
	canvas.addEventListener("mousedown", findPath);
	canvas.addEventListener("mouseup", findPath)
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function drawPath(){
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = "blue";
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();
	socket.emit('path', {px: prevX, py:prevY, cx: currX, cy: currY});

}
function receivePath(path){
	ctx.beginPath();
	ctx.moveTo(path.px, path.py);
	ctx.lineTo(path.cx, path.cy);
	ctx.strokeStyle = "blue"
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();
}
function findPath(){
	if(event.type === "mousedown"){
		isMouseDown = true;
		prevX = event.clientX;
		prevY = event.clientY;
		currX = prevX;
		currY = prevY;
	}else if(event.type === "mousemove"){
		if(isMouseDown){
			prevX = currX;
			prevY = currY;
			currX = event.clientX;
			currY = event.clientY;
			drawPath();
		}
	}else if(event.type === "mouseup"){
		isMouseDown = false;
	}
}

function fitCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
init();