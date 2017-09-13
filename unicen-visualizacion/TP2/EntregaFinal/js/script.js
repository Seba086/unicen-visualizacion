document.getElementById("canvas").addEventListener("mousedown", mousedown);
document.getElementById("canvas").addEventListener("mousemove", mousemove);
document.getElementById("canvas").addEventListener("mouseup", mouseup);
document.getElementById("canvas").addEventListener("mouseleave", mouseup  );

var dragging = 0;
var CANT_FICHAS = 6;
var Shapes = new Array(CANT_FICHAS);
var d1;
var figureId;
var figureWidth = 120;
var c = document.getElementById("canvas");
//c.style.cursor="crosshair";
var ctx = c.getContext("2d");
var draggedFigure = null;
var towers = new Array();
var lastPosX = 0;
var lastPosY = 0;

function Tower(id, r1, base1){
  this.id = id;
  this.elements = new Array(CANT_FICHAS);
  this.rect = r1;
  this.base = base1;
}

function Circle(id, paramPosX, paramPosY, paramRadio, paramColor){
  this.id = id;
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
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

Circle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}
Rectangle.prototype.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX,this.posY, this.width, this.height);
    
}

/*var rectangulo = new Rectangle(222,0,0,200,75);
rectangulo.draw();*/

function createShapes(){
  var posY = 280;
  var dif = 10;
  var posX = (towers[1].base.width)*0.65;
  for(i=0; i<CANT_FICHAS;i++){
    //var c1 = new Circle(i,150,150,50,randomColor());
    var r1 = new Rectangle(i,posX,posY,figureWidth-dif,20,randomColor());
    posY-=21;
    Shapes.push(r1);
    figureWidth-= dif;
    posX+=dif/2;
  }

}

function drawShapes(){
   Shapes.forEach(function(Shape){
    Shape.draw();
  });  
}

function createTowers(){ 

    var r1 = new Rectangle(1,135,150,35,150,'brown');
    var base1 = new Rectangle(0,75,300,150,15,'brown');
    var t1 = new Tower(1,r1,base1);
    towers.push(t1); 
    var r2 = new Rectangle(1,335,150,35,150,'brown');
    var base2 = new Rectangle(0,275,300,150,15,'brown');
    var t2 = new Tower(1,r2,base2);
    towers.push(t2); 
    var r3 = new Rectangle(1,535,150,35,150,'brown');
    var base3 = new Rectangle(0,475,300,150,15,'brown');
    var t3 = new Tower(1,r3,base3);
    towers.push(t3); 

    Shapes.forEach(function(Shape){
     towers[1].elements.push(Shape);
    });
}

function drawTowers(){
  towers.forEach(function(singleTower){
    singleTower.rect.draw();
    singleTower.base.draw();
  });
}


 /* Shapes.forEach(function(Shape){
  if(identifyShape(Shape,cX,cY)){
    figureId = Shape.id;
    d1 = Math.sqrt( ( Math.pow((cX-Shape.posX),2) + Math.pow((cY - Shape.posY),2) ) );
    dragging = 1;
    draggedFigure = Shape;
  }
    
  });
  var c1 = new Circle(1,200,300,50, randomColor());
  var c2 = new Circle(2,400,300,50, randomColor());
  Shapes.push(c1);
  Shapes.push(c2);*/
function identifyShape(Shape,cX,cY){
  //d1 = Math.sqrt( ( Math.pow((cX-Shape.posX),2) + Math.pow((cY - Shape.posY),2) ) );
  if( (cX>=Shape.posX) && (cX<=(Shape.posX+Shape.width))

    && (cY>=Shape.posY) && (cY<=(Shape.posY+Shape.height)) ) return true;
  else return false;
}

function mousedown (e){ //calculo d1
  //console.log("click en x: " + cX + ", y: " + cY);
  //console.log("c1 está en: x: " + c1.posX + ", y: " + c1.posY );
  var cX = e.clientX;
  var cY = e.clientY;
  //alert('c1: ' + c1.posX + ", " + c1.posY);
  Shapes.forEach(function(Shape){
    if(identifyShape(Shape,cX,cY)){
      figureId = Shape.id;
      //d1 = Math.sqrt( ( Math.pow((cX-Shape.posX),2) + Math.pow((cY - Shape.posY),2) ) );
      if(Shape.draggeable){
        dragging = 1;
        draggedFigure = Shape;
        lastPosX = draggedFigure.posX;
        lastPosY = draggedFigure.posY;
      } 
    }
    
  });
  //console.log('d1: ' + d1 + ', c1.radio: ' + c1.radio); 
  /*if (d1<c1.radio) console.log('adentro');
  else console.log('afuera');*/
};

function mouseup (e){
    dragging = 0;
    //console.log("Ahora c1 está en: x: " + c1.posX + ", y: " + c1.posY );
    if (draggedFigure!=null){
      draggedFigure.posX = lastPosX;
      draggedFigure.posY = lastPosY;
      lastPosX = 0;
      lastPosY = 0;
      console.log('lastPosX: ' + lastPosX + ', lastPosY: ' + lastPosY);
      draggedFigure.draggeable = false;
      draggedFigure = null;
      ctx.clearRect(0, 0, c.width, c.height);
      drawTowers(); 
      drawShapes();      
    }
}

function mousemove (e){
  if (dragging ==1){
    var cX = e.clientX;
    var cY = e.clientY;
    draggedFigure.posX = cX-draggedFigure.width/2;
    draggedFigure.posY = cY-draggedFigure.height/2;
    console.log('lastPosX: ' + lastPosX + ', lastPosY: ' + lastPosY);
    ctx.clearRect(0, 0, c.width, c.height);
    drawTowers(); 
    drawShapes();   
  }
}
/*
function checkDraggeable(){
  var i = 0;
  var ItsFirstOne = true;
  while(i<Shapes.length && Shapes[i]== null){
    i++;
  }
  if ((Shapes[i] != null) && (Shapes[i]<Shapes.length)){
    Shapes[i].draggeable=true;
    ItsFirstOne = false;
  }
}*/

function random(){
  return Math.floor((Math.random() * 50) + 1);;
}

function randomColor(){
  return 'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
}
function randomRGB(){
  return Math.floor((Math.random() * 256) + 1);;
}
function startGame(){
  createTowers();
  drawTowers();
  createShapes();
  drawShapes();
  Shapes[Shapes.length-1].draggeable=true;
}
startGame();





