window.addEventListener('load', startGame);
var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);   


var game;
var player;
var playerDistance = 0;
var modifDistance = 20;
var content = document.getElementById("content");
var playerWidth= 188.5;
var playerHeight = 150;
var gameScreen = {
	pos: content.getBoundingClientRect(),
	width: content.getBoundingClientRect().right - content.getBoundingClientRect().left,
	height: content.getBoundingClientRect().bottom - content.getBoundingClientRect().top
};

function Player(paramPosX, paramPosY, paramLives){
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.lives = paramLives;
}

function Game(player, enemies, score){
	this.player = new Player(gameScreen.width/2, gameScreen.height,3); 
	this.enemies = enemies;
	this.score = 0;
}

Game.prototype.drawScene = function(){
  document.getElementById("player").className = "player playerIddleLeft";
  document.getElementById("player").style.transform += "translate(" + (game.player.posX - (playerWidth*1.75)) + "px, " + (game.player.posY - playerHeight) + "px)";

}

Game.prototype.gameLoop = function(){
	//console.log(keyState);
    if (keyState[68]){ // Right
		playerDistance += modifDistance;
    	document.getElementById("player").style.transform = "translate(" + ((game.player.posX - playerWidth*1.75)+ playerDistance) + "px," + (game.player.posY - playerHeight) + "px)";
    	document.getElementById("player").className = "player playerWalksRight";
    }    
    if (keyState[65]){ // Left
    	playerDistance -= modifDistance;
    	document.getElementById("player").style.transform = "translate(" + ((game.player.posX - playerWidth*1.75) + playerDistance)+ "px," + (game.player.posY - playerHeight) + "px)";
    	document.getElementById("player").className = "player playerWalksLeft";

    }
    	setTimeout(game.gameLoop, 75);
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    
    
}

function keyup(){
  document.getElementById("player").className = "player playerIddleLeft";
}

function startGame(e){
	game = new Game();
	updateConsole();
	updateConsole();
	game.drawScene();
	game.gameLoop();
	
}

function updateConsole(){
	console.log("top: " + gameScreen.pos.top, ", right: " + gameScreen.pos.right, "bottom: " + gameScreen.pos.bottom,"left: " + gameScreen.pos.left);
	console.log("width: " + gameScreen.width, ", height: " + gameScreen.height);
	console.log("I'm the player, my pos is (" + game.player.posX + ", " + game.player.posY + "), and I have " + game.player.lives + " lives.");
}

