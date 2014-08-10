//Preset values
var PADDLE_LENGTH = 100;
var PADDLE_WIDTH = 10;
var PADDLE_COLOUR = "#000000";
var FPS = 30;

//Objects
function paddle(x_pos,y_pos,ctx){
	
	//Sets paddle position
	this.x_pos = x_pos;
	this.y_pos = y_pos;

	//Sets paddle size
	this.length = PADDLE_LENGTH;
	this.width = PADDLE_WIDTH;

	//Other values
	this.new_y = y_pos;
}

function ball(){}

//Runtime procedures
function update(){}

function draw(ctx,paddle1,paddle2){
	this.draw_paddle = function(paddleToDraw){
		ctx.fillStyle = "black";
		ctx.clearRect(paddleToDraw.x_pos, paddleToDraw.y_pos, PADDLE_WIDTH, PADDLE_LENGTH);
		ctx.drawRect(paddleToDraw.x_pos, paddleToDraw.new_y, PADDLE_WIDTH, PADDLE_LENGTH);
		paddleToDraw.y_pos = paddleToDraw.new_y;
	}
}

function run(){}

//main
function main (){
	var canvas = document.getElementById('pong');
	var ctx = canvas.getContext('2d');

	var paddle1 = new paddle(25,275,ctx);
	var paddle2 = new paddle(765,275,ctx);
	document.onkeydown  
}
