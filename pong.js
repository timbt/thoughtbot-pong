//Preset values

PADDLE_LENGTH = 100;
PADDLE_WIDTH = 10;
PADDLE_COLOUR = "#000000";

//Objects
function paddle(x_pos,y_pos,ctx){
	
	//Sets paddle position
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	
	//Sets paddle size
	this.length = PADDLE_LENGTH;
	this.width = PADDLE_WIDTH;

	this.draw = function(x,y,ctx){
			ctx.fillRect(x,y,PADDLE_WIDTH,PADDLE_LENGTH);
	};

	this.draw(x_pos,y_pos,ctx);

}

function ball(){}


//main
function main (){
	var canvas = document.getElementById('pong');
	var ctx = canvas.getContext('2d');

	var paddle1 = new paddle(25,275,ctx);
	
}
