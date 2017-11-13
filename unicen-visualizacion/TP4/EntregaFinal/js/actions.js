window.addEventListener('load', startGame);
var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);   

var bgPos = 0;
var floorPos = 0;
var bgTrees = 0;
var punch = new Audio('sfx/punch.mp3');
var music = new Audio('music/8 bit disco.mp3');
var game;
var player = document.getElementById("player");
var modifDistance = 15;
var lastKeyState = 0;
var foreground = document.getElementById("foreground");
var screen = document.getElementById("gameScreen");
var playerWidth = 188.5;
var playerHeight = 150;
var gameScreen = {
	pos: screen.getBoundingClientRect(),
	width: screen.getBoundingClientRect().right - screen.getBoundingClientRect().left,
	height: screen.getBoundingClientRect().bottom - screen.getBoundingClientRect().top
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
	player.className = "player playerIddleRight";
	player.style.transform += "translate(" + (game.player.posX - (playerWidth)) + "px, " + (game.player.posY - playerHeight) + "px)";

}

Game.prototype.gameLoop = function(){
	//console.log(keyState);
	//document.getElementById('bg-pos').innerHTML = "<p><b>Console</b></p><p>bgPos: " + bgPos + "</p><p>playerPos: (" + game.player.posX + ", " + game.player.posY + ")";
    if (keyState[68]){ // Right
    	if(game.player.posX<(gameScreen.width*0.75)){
			game.player.posX+= modifDistance;
	    	player.style.transform = "translate(" + (game.player.posX - playerWidth) + "px," + (game.player.posY - playerHeight) + "px)";
    	} else{
			bgPos-=modifDistance/4;
			floorPos-=modifDistance/2;
			bgTrees-=modifDistance/1.5;
			screen.style.backgroundPosition = floorPos + "px bottom, " + bgPos + "px bottom";
			foreground.style.backgroundPosition = bgTrees + "px bottom";
    	}
    	player.className = "player playerWalksRight";
    	lastKeyState = 68;
    }    
    else if (keyState[65]){ // Left
    	if(game.player.posX>(gameScreen.width*0.30)){
	    	game.player.posX-= modifDistance;
	    	player.style.transform = "translate(" + (game.player.posX - playerWidth)+ "px," + (game.player.posY - playerHeight) + "px)";
    	}else {
			bgPos+=modifDistance/4;
			floorPos+=modifDistance/2;
			bgTrees+=modifDistance/1.5;
			screen.style.backgroundPosition = floorPos + "px bottom, " + bgPos + "px bottom";
			foreground.style.backgroundPosition = bgTrees + "px bottom";
    	}
    	player.className = "player playerWalksLeft";
    	lastKeyState = 65;

    }
    else if (keyState[17]){ // Ctrl (Attack)
    	if(lastKeyState == 65){
			player.className = "player playerAttacksLeft";
    	setTimeout(function(){ 
          punch.play();
        }, 100);

	    } else {
	    	player.className = "player playerAttacksRight";
	    	setTimeout(function(){ 
	          punch.play();
	        }, 100);
	    }
    	

    }
    else{
    	if (lastKeyState==68){
	    	document.getElementById("player").className = "player playerIddleRight";
	    	updateConsole();
    	}
    	else if (lastKeyState==65) {
    		document.getElementById("player").className = "player playerIddleLeft";
    		updateConsole();

    	} 
    	
    }
    setTimeout(game.gameLoop, 115);
    // redraw/reposition your object here
    // also redraw/animate any objects not controlled by the user
    
    
}

function keyup(){
  
}

function startGame(e){
	game = new Game();
	//music.play();
	updateConsole();
	game.drawScene();
	game.gameLoop();

	
}

function updateConsole(){
	//console.log("top: " + gameScreen.pos.top, ", right: " + gameScreen.pos.right, "bottom: " + gameScreen.pos.bottom,"left: " + gameScreen.pos.left);
	//console.log("width: " + gameScreen.width, ", height: " + gameScreen.height);
	//console.log("I'm the player, my pos is (" + game.player.posX + ", " + game.player.posY + "), and I have " + game.player.lives + " lives.");
}

