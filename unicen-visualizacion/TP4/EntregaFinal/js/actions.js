document.addEventListener("DOMContentLoaded", function(event) { 
//window.addEventListener('load', startGame);
document.getElementById('start').addEventListener('click', startGame);
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
var playerLives = 3;
var punch = new Audio('sfx/punch.mp3');
var music = new Audio('music/8 bit disco.mp3');
var objectPick = new Audio('sfx/diamondPick.mp3');
var hurt = new Audio('sfx/hurt.wav');
var death = new Audio('music/death.mp3');
var monsterDies = new Audio('sfx/monsterHurt2.wav');
var game;
var modifDistance = 10;
var lastKeyState = 0;
var screen = document.getElementById("gameScreen");
var objectWidth = 30;
var objectHeight = 30;
var enemyHeight = 258;
var enemyWidth = 180;
var playerWidth = 188;
var playerHeight = 150;
/*var playerData = {
	pos: player.getBoundingClientRect(),
	width: player.getBoundingClientRect().right - screen.getBoundingClientRect().left,
	height: player.getBoundingClientRect().bottom - screen.getBoundingClientRect().top
}*/
var gameScreen = {
	pos: screen.getBoundingClientRect(),
	width: screen.getBoundingClientRect().right - screen.getBoundingClientRect().left,
	height: screen.getBoundingClientRect().bottom - screen.getBoundingClientRect().top
};
var playerScreenXPos = gameScreen.width/2;

function Player(paramPosX, paramPosY){
  this.x = paramPosX;
  this.y = paramPosY;
  this.width = playerWidth;
  this.height = playerHeight;
  this.lives = playerLives;
  this.score = 0;
  this.alive = true;
  this.attacks = false;
}

Game.prototype.setPlayerLives = function(value){
	for (i=0;i<value;i++){
		var lives = document.createElement('div');
		document.getElementById('gameScreen').appendChild(lives);
		var divId = 'div' + i;
		lives.setAttribute("id", divId);
		lives.setAttribute("class", "liveOn");
	}
}
function Object(id, paramPosX, paramPosY, value,type,objectW, objectH){
	this.id = id;
	this.x = paramPosX;
	this.y = paramPosY;
	this.width = objectW;
	this.height = objectH;
	this.value = value;
	this.type = type;
	this.currentDistance;
  }

Object.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
  Game.prototype.spawnObjects = function(diamonds, enemies){
	  var object;
	  var enemyId = 'enemy';
	//diamonds spawn
	for(i=0; i<diamonds;i++){
		var objX = random5000();
		object = new Object(i, objX,gameScreen.height-objectHeight*2,5,'diamond');
		object.currentDistance = objX; 
		game.objects.push(object);
	}
	//Enemies spawn
	for(i=0; i<enemies;i++){
		var objX = random5000();
		object = new Object(enemyId + i, objX,gameScreen.height-enemyHeight,500,'enemy');
		object.currentDistance = objX; 
		game.objects.push(object);
	}	
  }

  Game.prototype.drawObjects = function(){
	game.objects.forEach(object => {
		if(object.type == 'diamond'){
			document.getElementById("objects").innerHTML += '<div id="' + object.id + '" class="diamond"></div>';
		} else {
			document.getElementById("objects").innerHTML += '<div id="' + object.id + '" class="enemy"></div>';
		}
	});
  }

function Game(player, enemies, objects, score){
	this.player = new Player(gameScreen.width/2, gameScreen.height); 
	this.enemies = [];
	this.objects = [];
	this.score = 0;
}

Game.prototype.updatePlayerStatus = function(value){
	var score = game.player.score += value;
	document.getElementById('score').innerHTML = 'Score: ' + score;
}

function checkCollision(div1, div2) {
	var d1 = $('#' + div1);
	var d2 = $('#' + div2);
	var x1 = d1.offset().left;
	var y1 = d1.offset().top;
	var h1 = d1.outerHeight(true);
	var w1 = d1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = d2.offset().left;
	var y2 = d2.offset().top;
	var h2 = d2.outerHeight(true);
	var w2 = d2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
  }

Game.prototype.drawScene = function(){
	var player = document.getElementById('player');
	player.className = "player playerIddleRight";
	player.style.transform = "translate(" + (playerScreenXPos - (playerWidth)) + "px, " + (game.player.y - playerHeight) + "px)";
	game.objects.forEach(object => {
		document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (object.y) + "px)";
	});
		

}

Game.prototype.enemyMoves = function(){
	
		game.objects.forEach(object => {
			if(game.player.alive && object.type == 'enemy'){
				object.currentDistance -= modifDistance*1.1;
				//object.x -= modifDistance*1.1;
				document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (gameScreen.height - enemyHeight) + "px)";
			}
		});
}

Game.prototype.gameLoop = function(){
	game.player.attacks = false;
	var str;
	if (keyState[68] || keyState[39]){ // Right
		//console.log('Jugador (' + game.player.x + ', ' + game.player.y + '), W:' + game.player.width + ', H: ' + game.player.height);
		//console.log('Diamante (' + game.objects[0].x + ', ' + game.objects[0].y + '), W:' + game.objects[0].width + ', H: ' + game.objects[0].height);
		//console.log(player.offsetLeft + ' ' + document.getElementById('0').offsetLeft);
    	if(playerScreenXPos<(gameScreen.width*0.64)){
			game.player.x+= modifDistance;
			playerScreenXPos+= modifDistance;
			player.style.transform = "translate(" + (playerScreenXPos - playerWidth) + "px," + (game.player.y - playerHeight) + "px)";		
    	} else{
			game.player.x+= modifDistance;
			bgPos-=modifDistance/8;
			floorPos-=modifDistance;
			bgTrees-=modifDistance/1.5;
			screen.style.backgroundPosition = floorPos + "px bottom, " + bgPos + "px bottom";
			foreground.style.backgroundPosition = bgTrees + "px bottom";
			if (game.objects.length>0){
				game.objects.forEach(object => {
					if(game.player.x<object.currentDistance){
					
						//object.x -= modifDistance;
						object.currentDistance -= modifDistance;
						document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (object.y) + "px)";
					}
					else{
					
						//object.x -= modifDistance;
						object.currentDistance -= modifDistance;
						document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (object.y) + "px)";
					}
				});	
			}		
    	}
    	player.className = "player playerWalksRight";
    	lastKeyState = 68;
	}     
	else if (keyState[65] || keyState[37]){ // Left
		//console.log(player.offsetLeft + ' ' + document.getElementById('0').offsetLeft);
		//console.log('Jugador (' + game.player.x + ', ' + game.player.y + '), W:' + game.player.width + ', H: ' + game.player.height);
		//console.log('Diamante (' + game.objects[0].x + ', ' + game.objects[0].y + '), W:' + game.objects[0].width + ', H: ' + game.objects[0].height);
    	if(playerScreenXPos>(gameScreen.width*0.42)){
			game.player.x-= modifDistance;
			playerScreenXPos-= modifDistance;
	    	player.style.transform = "translate(" + (playerScreenXPos - playerWidth)+ "px," + (game.player.y - playerHeight) + "px)";
    	}else {
			game.player.x-= modifDistance;
			bgPos+=modifDistance/8;
			floorPos+=modifDistance;
			bgTrees+=modifDistance/1.5;
			screen.style.backgroundPosition = floorPos + "px bottom, " + bgPos + "px bottom";
			foreground.style.backgroundPosition = bgTrees + "px bottom";
			if (game.objects.length>0){
				game.objects.forEach(object => {
					if(game.player.x<object.currentDistance){
					
						//object.x += modifDistance;	
						object.currentDistance += modifDistance;	
						document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (object.y) + "px)";
					}
					else{
						//object.x += modifDistance;
						object.currentDistance += modifDistance;	
						document.getElementById(object.id).style.transform = "translate(" + (object.currentDistance) + "px, " + (object.y) + "px)";
					}
				});
			}	

    	}
    	player.className = "player playerWalksLeft";
    	lastKeyState = 65;

    }
	else if (keyState[17]){ // Ctrl (Attack)
			game.player.attacks = true;
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
	if (game.objects.length>0){
		
		game.objects.forEach(object => {
			str = object.id;
			if(checkCollision('playerBoundingBox', str)){
				if(object.type == 'diamond'){
					game.updatePlayerStatus(object.value); //actualiza el puntaje
					objectPick.pause();
					objectPick.currentTime = 0;
					objectPick.play();
					document.getElementById(object.id).style.display = 'none';
				}
				else if (object.type == 'enemy'){
					if(game.player.attacks == false){
						var livesLeft = 'div' + (playerLives-1);
						document.getElementById(livesLeft).className = 'liveOff';
						document.getElementById('player').className = 'playerDies';
						game.objects.forEach(element => {
							document.getElementById(element.id).className = "enemyFreezes";	// congelo a todos los monstruos
						});
						game.player.alive = false;
						hurt.play();
						death.play();
						music.pause();
						monsterDies.pause();
						monsterDies.currentTime = 0;						
						music.currentTime = 0;
						document.getElementById('gameScreen').className += " gameOver";
						if(game.player.lives>0){
							playerLives--;
							game.player.lives--;
							restartGame();
						}
						else{
							alert('game over');
						}
					} else {
						game.updatePlayerStatus(object.value); //el monstruo me da puntaje
						monsterDies.pause();
						monsterDies.currentTime = 0;
						monsterDies.play();
						document.getElementById(object.id).style.display = "none"; //monstruo desaparece
					}
				}
				
			}
			else{
			}
		});
	}
	if(game.player.alive){
		setTimeout(game.gameLoop, 65);    
	}
    
}

function random(){
	return Math.floor((Math.random() * 50) + 1);;
}
function random5000(){
	return Math.floor((Math.random() * 5000) + 500);;
}

function restartGame(){
	if (checkGameOver == true){
		document.getElementById('gameScreen').innerHTML = " ";
	}
	else{
		setTimeout(function () {
			document.getElementById('gameScreen').className = "gameScreen";
			document.getElementById('objects').innerHTML = " ";
			game.objects = [];
			/*game.player.x = gameScreen.width/2;
			game.player.y = gameScreen.height;
			gameScreen.width/2, gameScreen.height
			*/
			game.player.x = gameScreen.width/2;
			game.player.y = gameScreen.height;
			playerScreenXPos = gameScreen.width/2;
			game.player.alive = true;
			player.className = "player playerIddleRight";
			//player.style.transform = "translate(" + (gameScreen.width/2 - playerWidth) + "px, " + (game.player.y - playerHeight) + "px)";
			game.spawnObjects(random(), 5);
			game.drawObjects();	
			player.style.transform = "translate(" + (playerScreenXPos - (playerWidth)) + "px, " + (game.player.y - playerHeight) + "px)";
			game.objects.forEach(object => {
				document.getElementById(object.id).style.transform = "translate(" + (object.x) + "px, " + (object.y) + "px)";
			});
			game.gameLoop();	

		}, 5000);
	}
}

function prepareScenario(){
	document.getElementById('gameScreen').innerHTML = " ";
	var foregroundDiv = document.createElement('div');
	var playerDiv = document.createElement('div');
	var boundingBoxDiv = document.createElement('div');
	var objectsDiv = document.createElement('div');
	var scoreDiv = document.createElement('div');
	document.getElementById('gameScreen').appendChild(foregroundDiv);
	foregroundDiv.setAttribute("id", "foreground");
	foregroundDiv.setAttribute("class", "foreground");
	document.getElementById('gameScreen').appendChild(playerDiv);
	playerDiv.setAttribute("id", "player");
	playerDiv.setAttribute("class", "player");
	document.getElementById('player').appendChild(boundingBoxDiv);
	boundingBoxDiv.setAttribute("id", "playerBoundingBox");
	document.getElementById('gameScreen').appendChild(objectsDiv);
	objectsDiv.setAttribute("id", "objects");
	document.getElementById('gameScreen').appendChild(scoreDiv);
	scoreDiv.setAttribute("id", "score");		
	scoreDiv.innerHTML = "Score: 0";

}

function checkGameOver(){
	if(game.player.lives <= 0) return true;
	else return false;
}

function startGame(e){
	prepareScenario();
	game = new Game();
	//music.play();
	game.setPlayerLives(playerLives);
	game.spawnObjects(random(), 5); //Creo diamantes y enemigos
	game.drawObjects(); // Los agrego al DOM
	game.drawScene();	
	game.gameLoop();//

	window.setInterval(function(){
		if (game.player.alive){
			game.enemyMoves();
		}
	  }, 150);

	
}


function updateConsole(){

	//console.log("width: " + gameScreen.width, ", height: " + gameScreen.height);
	//console.log("I'm the player, my pos is (" + game.player.x + ", " + game.player.y + "), and I have " + game.player.lives + " lives.");
	//console.log("I'm d" + game.objects[0].id + ", my pos is (" + game.objects[0].x + ", " + game.objects[0].y + "), and my value is " +game.objects[0].value + ".");
}

});