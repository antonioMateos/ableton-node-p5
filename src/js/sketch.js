// SOCKETS FOR ABLETON VALUES
var socket = io();

socket.on("msg", function(msg){

	console.log("socket ON p5",msg);

});

// p5 JS
function setup() {
	createCanvas(1080, 768);
}

function draw() {
	/*
	if (mouseIsPressed) {
	fill(0);
	} else {
	fill(255);
	}
	*/
	fill(255);
	ellipse(width*0.5, height*0.5, 80, 80);
}