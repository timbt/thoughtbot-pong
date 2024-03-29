//Constants
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 600;

//Obtain compatible requestAnimationFrame for animation callback
var animate = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	function(callback) {window.setTimeout(callback, 1000 / 60)};

//Keypress detection
var keysDown = {};

window.addEventListener("keydown", function(event){
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event){
	delete keysDown[event.keyCode];	
});

//Create canvas
var canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
var context = canvas.getContext('2d');

//Object definitions

//Paddle
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

Paddle.prototype.move = function (x, y) {
	this.x += x;
	this.y += y;
	this.x_speed = x;
	this.y_speed = y;
	if (this.x < 0) { //left wall collision
		this.x = 0;
		this.x_speed = 0;
	}
	else if (this.x + this.width > 400) { //right wall collision
		this.x = 400 - this.width;
		this.x_speed = 0;
	}
}

//Player
function Player() {
	this.paddle = new Paddle(175,580,50,10);
}

Player.prototype.render = function() {
	this.paddle.render();
};

Player.prototype.update = function() {
	for (var key in keysDown) {
		var value = Number(key);
		if (value == 37) { //left arrow
			this.paddle.move(-4,0);
		}
		else if (value == 39) {//right arrow
			this.paddle.move(4,0);
		}
		else {
			this.paddle.move(0,0);
		}
	}
};

//Computer
function Computer() {
	this.paddle = new Paddle(175,10,50,10);
}

Computer.prototype.render = function(){
	this.paddle.render();
};

Computer.prototype.update = function(ball) {
	var x_pos = ball.x;
	var diff = -((this.paddle.x + this.paddle.width / 2 ) - x_pos);
	if (diff <= -4){ //max speed left
		diff = -4;
	}
	else if (diff >= 4){ //max speed right
		diff = 4;
	}

this.paddle.move(diff, 0);
};

//Ball
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

Ball.prototype.update = function(paddle1,paddle2) {
	this.x += this.x_speed;
	this.y += this.y_speed;
	var top_x = this.x - 5;
	var top_y = this.y - 5;
	var bottom_x = this.x + 5;
	var bottom_y = this.y + 5;

	if (this.x - 5 < 0) { //left wall collision
		this.x = 5;
		this.x_speed = -this.x_speed;
	}

	else if (this.x + 5 > 400) { //right wall collision)
		this.x = 395;
		this.x_speed = -this.x_speed;
	}

	if (this.y < 0 || this.y > 600) { //top or bottom wall collision (reset)
		this.x_speed = 0;
		this.y_speed = 3;
		this.x = 200;
		this.y = 300;
	}
	
	if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x){
			this.y_speed = -3;
			this.x_speed += (paddle1.x_speed / 2);
		}
	
	if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x){
			this.y_speed = 3;
			this.x_speed += (paddle2.x_speed / 2);
		}

};

//Object creation
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

//Important Functions and Stuff
var update = function () {
	ball.update(player.paddle,computer.paddle);
	player.update();
	computer.update(ball);
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

