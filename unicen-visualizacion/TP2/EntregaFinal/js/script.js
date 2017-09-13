function Circle(id, paramPosX, paramPosY, paramRadio, paramColor){
  this.id = id;
  this.posX = paramPosX;
  this.posY = paramPosY;
  this.radio = paramRadio;
  this.color = paramColor;
}

Circle.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

document.getElementById("canvas").addEventListener("mousedown", mousedown);
document.getElementById("canvas").addEventListener("mousemove", mousemove);
document.getElementById("canvas").addEventListener("mouseup", mouseup);
document.getElementById("canvas").addEventListener("mouseleave", mouseleave);

var flag = 0;
var figuras = new Array();
var d1;
var figureId;
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var draggedFigure = null;

var c1 = new Circle(1,200,300,50, randomColor());
var c2 = new Circle(2,400,300,50, randomColor());
figuras.push(c1);
figuras.push(c2);
dibujarFiguras();



function identifyShape(figura,cX,cY){
  d1 = Math.sqrt( ( Math.pow((cX-figura.posX),2) + Math.pow((cY - figura.posY),2) ) );
  if(d1<figura.radio) return true;
  else return false;
}

function mousedown (e){ //calculo d1
  //console.log("click en x: " + cX + ", y: " + cY);
  console.log("c1 está en: x: " + c1.posX + ", y: " + c1.posY );
  var cX = e.clientX;
  var cY = e.clientY;
  //alert('c1: ' + c1.posX + ", " + c1.posY);

  figuras.forEach(function(figura){
    if(identifyShape(figura,cX,cY)){
      figureId = figura.id;
      d1 = Math.sqrt( ( Math.pow((cX-figura.posX),2) + Math.pow((cY - figura.posY),2) ) );
      flag = 1;
      draggedFigure = figura;
    }
    
  });
  //console.log('d1: ' + d1 + ', c1.radio: ' + c1.radio); 
  /*if (d1<c1.radio) console.log('adentro');
  else console.log('afuera');*/
};

function mouseup (e){
  if (flag ==1){
    flag = 0;
    console.log("Ahora c1 está en: x: " + c1.posX + ", y: " + c1.posY );
    draggedFigure = null;
  }
}
function mouseleave (e){
  if (flag ==1){
    flag = 0;
    console.log("Ahora c1 está en: x: " + c1.posX + ", y: " + c1.posY );
    draggedFigure = null;
  }
}

function mousemove (e){
  if (flag ==1){
    var cX = e.clientX;
    var cY = e.clientY;
    draggedFigure.posX = cX;
    draggedFigure.posY = cY;
    ctx.clearRect(0, 0, c.width, c.height);
    dibujarFiguras();    
  }
}

function dibujarFiguras(){
   figuras.forEach(function(figura){
    figura.draw();
  });
}

function random(){
  return Math.floor((Math.random() * 50) + 1);;
}

function randomColor(){
  return 'rgb('+randomRGB()+','+randomRGB()+','+randomRGB()+')';
}
function randomRGB(){
  return Math.floor((Math.random() * 256) + 1);;
}








