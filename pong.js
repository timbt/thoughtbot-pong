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

//Ballin'
function Ball (x,y){
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 3;
	this.radius = 5;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	context.fillStyle = "#000000";
	context.fill();
};

Ball.prototype.update = function() {
	this.x += this.x_speed;
	this.y += this.y_speed;
};

//Ay makin' da shit
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

//Important Functions and Stuff
var update = function () {
	ball.update();
};

var render = function () {
	context.fillStyle = "#FF00FF";
	context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	player.render();
	computer.render();
	ball.render();
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

