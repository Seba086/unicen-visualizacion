document.addEventListener("DOMContentLoaded", function(event) { 
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
var playerLives = 3;
var punch = new Audio('sfx/punch.mp3');
var music = new Audio('music/8 bit disco.mp3');
var objectPick = new Audio('sfx/diamondPick.mp3');
var hurt = new Audio('sfx/hurt.wav');
var death = new Audio('music/death.mp3');
var monsterDies = new Audio('sfx/monsterHurt2.wav');
var game;
var player = document.getElementById("player");
var modifDistance = 10;
var lastKeyState = 0;
var foreground = document.getElementById("foreground");
var screen = document.getElementById("gameScreen");
var objectWidth = 30;
var objectHeight = 30;
var enemyHeight = 258;
var enemyWidth = 180;
var playerWidth = 188;
var playerHeight = 150;
var playerData = {
	pos: player.getBoundingClientRect(),
	width: player.getBoundingClientRect().right - screen.getBoundingClientRect().left,
	height: player.getBoundingClientRect().bottom - screen.getBoundingClientRect().top
}
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

function setPlayerLives(value){
	for (i=0;i<value;i++){
		var lives = document.createElement('div');
		document.getElementById('gameScreen').appendChild(lives);
		var divId = 'div' + i;
		lives.setAttribute("id", divId);
		lives.setAttribute("class", "liveOn");
	}
}
function Object(id, paramPosX, paramPosY, value,type){
	this.id = id;
	this.x = paramPosX;
	this.y = paramPosY;
	this.width = objectWidth;
	this.height = objectHeight;
	this.value = value;
	this.type = type;
  }

  function spawnObjects(diamonds, enemies){
	  var object;
	  var enemyId = 'enemy';
	//diamonds spawn
	for(i=0; i<diamonds;i++){
		object = new Object(i, random5000(),gameScreen.height-objectHeight*2,5,'diamond');
		game.objects.push(object);
	}
	//Enemies spawn
	for(i=0; i<enemies;i++){
		object = new Object(enemyId + i, random5000(),gameScreen.height-enemyHeight,500,'enemy');
		game.objects.push(object);
	}	
  }

  function drawObjects(){
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
/*function checkCollision(a,b){ //identifica si se chocan las figuras
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((playerScreenXPos + a.width) < b.x) ||
        (playerScreenXPos > (b.x + b.width))
    );	  
}*/

function updatePlayerStatus(value){
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
	player.className = "player playerIddleRight";
	player.style.transform += "translate(" + (playerScreenXPos - (playerWidth)) + "px, " + (game.player.y - playerHeight) + "px)";
	this.objects.forEach(object => {
		document.getElementById(object.id).style.transform += "translate(" + (object.x) + "px, " + (object.y) + "px)";
	});
}

Game.prototype.enemyMoves = function(){
	
		game.objects.forEach(object => {
			if(object.type == 'enemy'){
				document.getElementById(object.id).style.transform += "translateX(" + (-modifDistance*1.1) + "px)";
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
					if(game.player.x<object.x){
					
						object.x -= modifDistance;
						
						document.getElementById(object.id).style.transform += "translateX(" + (-modifDistance) + "px)";
					}
					else{
					
						object.x += modifDistance;
					
						document.getElementById(object.id).style.transform += "translateX(" + (-modifDistance) + "px)";
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
					if(game.player.x<object.x){
					
						object.x += modifDistance;		
						document.getElementById(object.id).style.transform += "translateX(" + modifDistance + "px)";
					}
					else{
						object.x -= modifDistance;
						document.getElementById(object.id).style.transform += "translateX(" + modifDistance + "px)";
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
					updatePlayerStatus(object.value); //actualiza el puntaje
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
						
						playerLives--;
						game.player.alive = false;
						hurt.play();
						death.play();
						music.pause();
						monsterDies.pause();
						monsterDies.currentTime = 0;						
						music.currentTime = 0;
						document.getElementById('gameScreen').className += " gameOver";
					} else {
						updatePlayerStatus(object.value); //el monstruo me da puntaje
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
function startGame(e){
	game = new Game();
	spawnObjects(random(), 5);
	//music.play();
	drawObjects();
	setPlayerLives(playerLives);
	game.drawScene();
	game.enemyMoves();
	game.gameLoop();
	window.setInterval(function(){
		if (game.player.alive){
			game.enemyMoves();
		}
	  }, 150);

	
}


function updateConsole(){
	//console.log("top: " + gameScreen.pos.top, ", right: " + gameScreen.pos.right, "bottom: " + gameScreen.pos.bottom,"left: " + gameScreen.pos.left);
	//console.log("width: " + gameScreen.width, ", height: " + gameScreen.height);
	//console.log("I'm the player, my pos is (" + game.player.x + ", " + game.player.y + "), and I have " + game.player.lives + " lives.");
	//console.log("I'm d" + game.objects[0].id + ", my pos is (" + game.objects[0].x + ", " + game.objects[0].y + "), and my value is " +game.objects[0].value + ".");
}

});