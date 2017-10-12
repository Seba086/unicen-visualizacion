document.getElementById("canvas").addEventListener("mousedown", mousedown);
document.getElementById("canvas").addEventListener("mousemove", mousemove);
document.getElementById("canvas").addEventListener("mouseup", mouseup);
document.getElementById("canvas").addEventListener("mouseleave", mouseup  );

var dragging = 0;
var CANT_FICHAS = 5;
var d1;
var shapeId;
var shapeWidth = 120;
var shapeHeight = 20;
var c = document.getElementById("canvas");
//c.style.cursor="crosshair";
var ctx = c.getContext("2d");
var draggedShape = null;
var towers = new Array();
var lastPosX = 0;
var lastPosY = 0;

function Tower(id, height, base){
  this.id = id;
  this.elements = new Array();
  this.height = height; //guardo el objeto rectángulo del palo
  this.base = base; //guardo el objeto rectángulo de la base
  this.towerHeight = 0;
  this.shapesPosX = 20;
}

function Rectangle(id, paramPosX, paramPosY, paramWidth, paramHeight, paramColor){
  this.id = id;
  this.draggeable = false;
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.width = paramWidth;
  this.height = paramHeight;
  this.color = paramColor;
}

Rectangle.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX,this.posY, this.width, this.height);
    
}
Tower.prototype.createShapes = function(){
  var posY = this.base.posY - shapeHeight;
  var dif = 10;
  var posX = this.height.posX+( (this.height.width/2) - shapeWidth/2) ;
  var newShapeWidth = shapeWidth;
  for(i=0; i<CANT_FICHAS;i++){
    var singleShape = new Rectangle(i,posX,posY,newShapeWidth,shapeHeight,randomColor());
    posY-= shapeHeight;
    this.elements.push(singleShape);
    this.towerHeight += shapeHeight;

    newShapeWidth-= dif;
    posX+=dif/2;
  }
}

Tower.prototype.drawShapes = function(){
  this.elements.forEach(function(shape){
    shape.draw();
    shape.draggeable = false;

  });       
   this.onlyLastDraggeable();
}

Tower.prototype.onlyLastDraggeable = function(){
   var i = this.elements.length-1;
   while ( (i>0) && (this.elements[i] == null)){
    i--;
   }
   if (i>=0){
    this.elements[i].draggeable=true;
   }
}

function createTowers(){ 

    var height1 = new Rectangle(1,135,150,shapeWidth/4,150,'brown');
    var base1 = new Rectangle(0,75,300,150,15,'brown');
    var t1 = new Tower(1,height1,base1);
    towers.push(t1); 
    var height2 = new Rectangle(2,335,150,shapeWidth/4,150,'brown');
    var base2 = new Rectangle(0,275,300,150,15,'brown');
    var t2 = new Tower(2,height2,base2);
    towers.push(t2); 
    var height3 = new Rectangle(3,535,150,shapeWidth/4,150,'brown');
    var base3 = new Rectangle(0,475,300,150,15,'brown');
    var t3 = new Tower(3,height3,base3);
    towers.push(t3); 
}

Tower.prototype.draw = function(){
  this.height.draw();
  this.base.draw();
  this.drawShapes();
  this.onlyLastDraggeable();
}

function drawTowers(){
  towers.forEach(function(singleTower){
    singleTower.draw();
  });

  }

function removeShapeFromPreviousTower() {
  var index;
  towers.forEach(function(singleTower){
    index = 0;
    singleTower.elements.forEach(function(shape){
      if (shape == draggedShape){
        shape = null; 
        singleTower.elements.splice(index, 1);
        singleTower.towerHeight -= shapeHeight;
      }
      index++;
    });
    
  });
}



function identifyShape(shape,cX,cY){ //identifica si se clickeó un rectángulo
  if( (cX>=shape.posX) && (cX<=(shape.posX+shape.width))

    && (cY>=shape.posY) && (cY<=(shape.posY+shape.height)) ) return true;
  else return false;
}

function mousedown (e){ 
  var cX = e.clientX;
  var cY = e.clientY;
  var i;
  for (i=0; i<3;i++){
    towers[i].elements.forEach(function(shape){
      if(identifyShape(shape,cX,cY)){
        if(shape.draggeable){
          dragging = 1;
          draggedShape = shape;
          lastPosX = draggedShape.posX;
          lastPosY = draggedShape.posY;
        } 
      }
      
    });
  }
};

function mouseup (e){
    var cX = e.clientX;
    var cY = e.clientY;
    dragging = 0;

    if (draggedShape!=null){
      var i =0;
      while (i<3 && !(identifyShape(towers[i].height,cX, cY))) {
        i++;
      }
      if (i<3 && (identifyShape(towers[i].height,cX, cY))){
        removeShapeFromPreviousTower();
        towers[i].elements.push(draggedShape);
        draggedShape.posY = (towers[i].base.posY - towers[i].towerHeight);
        draggedShape.posX = towers[i].height.posX+( (towers[i].height.width/2) - shapeWidth/3);   

        // Cuando suelto la ficha, que se acomode según la altura de la torre
        if (towers[i].elements[towers[i].elements.length-1] != null){ //chequeo que la torre no esté vacía
          draggedShape.posY -= shapeHeight;
          // Espacio entre fichas
          // Acomodo la posX de la nueva ficha insertada
          towers[i].shapesPosX -= towers[i].elements[towers[i].elements.length-1].width/16;
        }
        towers[i].towerHeight += shapeHeight;
        updateConsole();  
      } else {
        draggedShape.posX = lastPosX; 
        draggedShape.posY = lastPosY;
      }
      draggedShape = null;
      ctx.clearRect(0, 0, c.width, c.height);
      drawTowers();  
      lastPosX = 0;
      lastPosY = 0;

    }


    
}

function mousemove (e){
  var cX = e.clientX;
  var cY = e.clientY;
  if (dragging ==1){
    draggedShape.posX = cX-draggedShape.width/2;
    draggedShape.posY = cY-draggedShape.height/2;
    ctx.clearRect(0, 0, c.width, c.height);
    drawTowers();
  }
  document.getElementById("cX").value = cX;
  document.getElementById("cY").value = cY;
}


function random(){
  return Math.floor((Math.random() * 50) + 1);;
}

function randomColor(){
  return 'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
}
function randomRGB(){
  return Math.floor((Math.random() * 256) + 1);
}
function startGame(){
  createTowers();
  drawTowers();
  towers[0].createShapes();
  towers[0].drawShapes();
}

function updateConsole(){
  
  var i;
for (i=0; i<3;i++){
  console.log("Torre " + i + ": ");

  if (towers[i].elements.length==0){
    console.log("--> torre sin fichas.");
  }
  else{
    console.log("cant de fichas: " + towers[i].elements.length);
    towers[i].elements.forEach(function(shape){
    console.log("Shape: " + shape.id + ' - Draggueable: ' + shape.draggeable);
    });

  }
  console.log("TowerHeight: " + towers[i].towerHeight);
};
  
}

startGame();
updateConsole();






