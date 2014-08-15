//Constants
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 600;

//Obtain compatible requestAnimationFrame for animation callback
var animate = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	function(callback) {window.setTimeout(callback, 1000 / 60)};

//Create canvas
var canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

//Sexy objects
function Paddle(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;	
}

Paddle.prototype.render = function() {
	context.fillStyle = "#0000FF";
	context.fillRect(this.x, this.y, this.width, this.height);	
};

function Player() {
	this.paddle = new Paddle(175,580,50,10);
}

Player.prototype.render = function() {
	this.paddle.render();
};

function Computer() {
	this.paddle = new Paddle(175,10,50,10);
}

Computer.prototype.render = function(){
	this.paddle.render();
};

var player = new Player;
var computer = new Computer;

//Important Functions and Stuff
var update = function () {};

var render = function () {
	context.fillStyle = "#FF00FF";
	context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	player.render();
	computer.render();
};

var step = function (){
	update();
	render();
	animate(step);
};


//I think this is Javascript's equivelant of int main();
window.onload = function(){
	document.body.appendChild(canvas);
	animate(step);
};

