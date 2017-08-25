  $(document).ready( function(){

    //RGB 255
    var tope=255;
    var imageDataInicial;

    //Scroll effect
    $('canvas').click(function(){
      $('html, body').animate({scrollTop: $("#showroom").offset().top}, 1500);
    });
    
    
    // Creo los canvas y obtengo los context
    var c=document.getElementById("canvasBefore");
    var ctx=c.getContext("2d");
    var c2=document.getElementById("canvasAfter");
    var ctx2=c2.getContext("2d");

    //Hidden Canvas
    var cFinal=document.getElementById("canvasFinal");
    var ctxFinal=cFinal.getContext("2d");

    //Creo los canvas de las miniaturas
    var c3=document.getElementById("canvasByN");
    var ctx3=c3.getContext("2d");
    var c4=document.getElementById("canvasNeg");
    var ctx4=c4.getContext("2d");
    var c5=document.getElementById("canvasBright");
    var ctx5=c5.getContext("2d");     
    var c6=document.getElementById("canvasBin");
    var ctx6=c6.getContext("2d");    
    var c7=document.getElementById("canvasSep");
    var ctx7=c7.getContext("2d");   

  
    //Carga de la Imagen
    var image1 = new Image();

    image1.onload = function() {
      myDrawImageMethod(this);
    }    

    function myDrawImageMethod(image){
      resizeCanvas(image);
      ctxFinal.drawImage(image, 0, 0, image.width, image.height);
      imageDataInicial=ctxFinal.getImageData(0,0,image.width,image.height);
      ctx.canvas.width = 450;
      ctx.canvas.height = 340;
      ctx.drawImage(image, 0, 0, 450, 340);
    }

  //// Carga de la imagen ////
    $('#upload').click(function(){
      $('#file-input').click();
    });

    document.getElementById("file-input").onchange=function addImage(e){
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
      image1.src = e.target.result;
      $("#sliderBrillo").addClass("hide");      
      $("#sliderBinarizacion").addClass("hide");
      $("div.hide").removeClass("hide");
      $("#downloadCallToAction").addClass("hide");
      $("#callToAction").html("Change image");
      $('html, body').animate({scrollTop: $("#chooseFilter").offset().top}, 700);
      demoCanvas();
      limpiarCanvasAfter();
      limpiarCanvasBefore();
      limpiarMiniCanvas();
      limpiarCanvasFinal();
      }
      reader.readAsDataURL(file);   
    };

    //Aplico filtros al clickear las miniaturas
    $("#canvasByN").click(function(){
      filtroByN();
      filtroByNFinal(imageDataInicial);
      $("#downloadCallToAction").removeClass("hide");
    });
    $("#canvasNeg").click(function(){
      filtroNegativo();
      filtroNegativoFinal(imageDataInicial);
      $("#downloadCallToAction").removeClass("hide");
    });
    $("#canvasSep").click(function(){
      filtroSepia();
      filtroSepiaFinal(imageDataInicial);
      $("#downloadCallToAction").removeClass("hide");
      });
    $("#canvasBright").click(function(){
      $("#sliderBrillo").removeClass("hide")
    });
    $("#canvasBin").click(function(){
      $("#sliderBinarizacion").removeClass("hide")
    });
    $("#filtroSepia").click(function(){
      filtroSepia();
      $("#downloadCallToAction").removeClass("hide");
    });

    //Slider Brillo
    $(document).on('input change', '#sliderBrillo', function() {
      var brillo = parseInt($(this).val());
        $('#cantBrillo').html(brillo);
        filtroBrillo(brillo);
        filtroBrilloFinal(brillo,imageDataInicial);
    });
    // Slider Binarización
    $(document).on('input change', 'input#sliderBinarizacion', function() {
      var media = parseInt($(this).val());
        $('#rangoBinarizacion').html(media);
        filtroBinarizacion(media);
        filtroBinarizacionFinal(media,imageDataInicial);
    });

   // Cargo la imagen en las miniaturas y aplico filters
   function demoCanvas(){

   var img = new Image();
   
    img.onload = function () {
      ctx3.drawImage(img, 0, 0, 150, img.height * (150/img.width));
      bynMini(img);
      ctx4.drawImage(img, 0, 0, 150, img.height * (150/img.width));
      negMini(img);
      ctx5.drawImage(img, 0, 0, 150, img.height * (150/img.width));
      brightMini(img);
      ctx6.drawImage(img, 0, 0, 150, img.height * (150/img.width));
      binMini(img);
      ctx7.drawImage(img, 0, 0, 150, img.height * (150/img.width));
      sepiaMini(img);
    }
    img.src = image1.src;

   }                  

   // Funciones de los Mini Filters
   function bynMini(img){
    var imgData = ctx3.getImageData(0,0,img.width,img.height);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var red = getRed(imgData,x,y);
          var green = getGreen(imgData,x,y);
          var blue = getBlue(imgData,x,y);

          var gray = (red + green + blue) /3;
          setPixel(imgData,x,y,gray,gray,gray,tope); 

        }
      }
      ctx3.putImageData(imgData,0,0);
   }
   function negMini(img){
      var imgData = ctx4.getImageData(0,0,img.width,img.height);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var red = getRed(imgData,x,y);
          var green = getGreen(imgData,x,y);
          var blue = getBlue(imgData,x,y);
          //alert(gray);
          setPixel(imgData,x,y,255-red,255-green,255-blue,tope); //esto modifica la imagen

        }
      }
      ctx4.putImageData(imgData,0,0);
     }
     function brightMini(img){
     var imgData = ctx5.getImageData(0,0,img.width,img.height);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var red = getRed(imgData,x,y) + 150;
          var green = getGreen(imgData,x,y) + 150;
          var blue = getBlue(imgData,x,y) + 150;
          setPixel(imgData,x,y,red,green,blue,255);

        }
      }
      ctx5.putImageData(imgData,0,0);
     }
     function binMini(img){
      var imgData = ctx6.getImageData(0,0,img.width,img.height);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var red = getRed(imgData,x,y);
          red = monochrome(red,150);
          var green = getGreen(imgData,x,y);
          green = monochrome(green,150);
          var blue = getBlue(imgData,x,y);
          blue = monochrome(blue,150);
          setPixel(imgData,x,y,red,green,blue,255);

        }
      }
      ctx6.putImageData(imgData,0,0);
     }
     function sepiaMini(img){
      var imgData =  ctx7.getImageData(0,0,img.width,img.height);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var sepia = getRed(imgData,x,y)*0.3 + getGreen(imgData,x,y)*0.59 + getBlue(imgData,x,y)*0.11;
        
          setPixel(imgData,x,y,sepia+100,sepia+50,sepia,255);

        }
      }
      ctx7.putImageData(imgData,0,0);
     }     
    //Visible Canvas Filters
      function filtroByN(){
        limpiarCanvasAfter();
        var imgData = ctx.getImageData(0,0,450,340);
        for(x=0;x<imgData.width;x++){
          for(y=0;y<imgData.height;y++){
            var red = getRed(imgData,x,y);
            var green = getGreen(imgData,x,y);
            var blue = getBlue(imgData,x,y);

            var gray = (red + green + blue) /3;
            setPixel(imgData,x,y,gray,gray,gray,tope); 

          }
        }
        ctx2.putImageData(imgData, 0, 0);
     }
    function filtroNegativo(){
      limpiarCanvasAfter();
      var imgData = ctx.getImageData(0,0,450,340);
      for(x=0;x<imgData.width;x++){
        for(y=0;y<imgData.height;y++){
          var red = getRed(imgData,x,y);
          var green = getGreen(imgData,x,y);
          var blue = getBlue(imgData,x,y);
          setPixel(imgData,x,y,255-red,255-green,255-blue,tope); //esto modifica la imagen

        }
      }
      ctx2.putImageData(imgData, 0, 0);

     }
     function filtroSepia(){
      limpiarCanvasAfter();
      var imageData2 =  ctx.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageData2.width;x++){
        for(y=0;y<imageData2.height;y++){
          var sepia = getRed(imageData2,x,y)*0.3 + getGreen(imageData2,x,y)*0.59 + getBlue(imageData2,x,y)*0.11;
        
          setPixel(imageData2,x,y,sepia+100,sepia+50,sepia,tope);

        }
      }
      ctx2.putImageData(imageData2,0,0);
     }
     function filtroBrillo(brightness){
      limpiarCanvasAfter();
      var imageData2 = ctx.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageData2.width;x++){
        for(y=0;y<imageData2.height;y++){
          var red = getRed(imageData2,x,y) + brightness;
          var green = getGreen(imageData2,x,y) + brightness;
          var blue = getBlue(imageData2,x,y) + brightness;
          setPixel(imageData2,x,y,red,green,blue,tope);

        }
      }
      ctx2.putImageData(imageData2, 0, 0);
     }

     function filtroBinarizacion(media){
      limpiarCanvasAfter();
      var imageData2 = ctx.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageData2.width;x++){
        for(y=0;y<imageData2.height;y++){
          var red = getRed(imageData2,x,y);
          red = monochrome(red,media);
          var green = getGreen(imageData2,x,y);
          green = monochrome(green,media);
          var blue = getBlue(imageData2,x,y);
          blue = monochrome(blue,media);
          setPixel(imageData2,x,y,red,green,blue,tope);

        }
      }
      ctx2.putImageData(imageData2, 0, 0);
     }

     function monochrome(valor,grade){
      if (valor<=grade) return 0;
      else return 255;
     }

   // Hidden Canvas Filters
    function filtroByNFinal(imageDataInicial){
      limpiarCanvasFinal();
      ctxFinal.putImageData(imageDataInicial,0,0);
      var imgDataFinal = ctxFinal.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageDataInicial.width;x++){
        for(y=0;y<imageDataInicial.height;y++){
          var red = getRed(imageDataInicial,x,y);
          var green = getGreen(imageDataInicial,x,y);
          var blue = getBlue(imageDataInicial,x,y);

          var gray = (red + green + blue) /3;
          setPixel(imgDataFinal,x,y,gray,gray,gray,tope); 

        }
      }
      
      ctxFinal.putImageData(imgDataFinal, 0, 0);
     }

    function filtroNegativoFinal(imageDataInicial){
      limpiarCanvasFinal();
      ctxFinal.putImageData(imageDataInicial,0,0);
      var imgDataFinal = ctxFinal.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageDataInicial.width;x++){
        for(y=0;y<imageDataInicial.height;y++){
          var red = getRed(imageDataInicial,x,y);
          var green = getGreen(imageDataInicial,x,y);
          var blue = getBlue(imageDataInicial,x,y);
          //alert(gray);
          setPixel(imgDataFinal,x,y,255-red,255-green,255-blue,tope); //esto modifica la imagen

        }
      }
      ctxFinal.putImageData(imgDataFinal, 0, 0);

     }

    function filtroSepiaFinal(imageDataInicial){
      limpiarCanvasFinal();
      ctxFinal.putImageData(imageDataInicial,0,0);
      var imgDataFinal = ctxFinal.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageDataInicial.width;x++){
        for(y=0;y<imageDataInicial.height;y++){
          var sepia = getRed(imageDataInicial,x,y)*0.3 + getGreen(imageDataInicial,x,y)*0.59 + getBlue(imageDataInicial,x,y)*0.11;
        
          setPixel(imgDataFinal,x,y,sepia+100,sepia+50,sepia,tope);

        }
      }
      ctxFinal.putImageData(imgDataFinal,0,0);
     } 
    function filtroBrilloFinal(brightness,imageDataInicial){
      limpiarCanvasFinal();
      ctxFinal.putImageData(imageDataInicial,0,0);
      var imgDataFinal = ctxFinal.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageDataInicial.width;x++){
        for(y=0;y<imageDataInicial.height;y++){
          var red = getRed(imageDataInicial,x,y) + brightness;
          var green = getGreen(imageDataInicial,x,y) + brightness;
          var blue = getBlue(imageDataInicial,x,y) + brightness;
          setPixel(imgDataFinal,x,y,red,green,blue,tope);

        }
      }
      ctxFinal.putImageData(imgDataFinal, 0, 0);
     }    

     function filtroBinarizacionFinal(media,imageDataInicial){
      limpiarCanvasFinal();
      ctxFinal.putImageData(imageDataInicial,0,0);
      var imgDataFinal = ctxFinal.getImageData(0,0,image1.width,image1.height);
      for(x=0;x<imageDataInicial.width;x++){
        for(y=0;y<imageDataInicial.height;y++){
          var red = getRed(imageDataInicial,x,y);
          red = monochrome(red,media);
          var green = getGreen(imageDataInicial,x,y);
          green = monochrome(green,media);
          var blue = getBlue(imageDataInicial,x,y);
          blue = monochrome(blue,media);
          setPixel(imgDataFinal,x,y,red,green,blue,tope);

        }
      }
      ctxFinal.putImageData(imgDataFinal, 0, 0);
     }
///////////////////////////////////////////////////////////////////////////////
     //Limpio los Canvas
    function limpiarCanvasBefore(){
      ctx.clearRect(0,0,c.width,c.height);
    }
    function limpiarCanvasAfter(){
      ctx2.clearRect(0,0,c2.width,c2.height);
    }
    function limpiarCanvasFinal(){
      ctxFinal.clearRect(0,0,cFinal.width,cFinal.height);
    }    
    function limpiarMiniCanvas(){
      ctx3.clearRect(0,0,c3.width,c3.height);
      ctx4.clearRect(0,0,c4.width,c4.height);
      ctx5.clearRect(0,0,c5.width,c5.height);
      ctx6.clearRect(0,0,c6.width,c6.height);
      ctx7.clearRect(0,0,c7.width,c7.height);
    }

    //Para obtener la información de color de cada pixel

    function getRed (imageData, x, y) {
      index = (x + y * imageData.width)*4;
      return imageData.data[index+0];
    }

    function getGreen (imageData, x, y) {
      index = (x + y * imageData.width)*4;
      return imageData.data[index+1];
    }
    function getBlue (imageData, x, y) {
      index = (x + y * imageData.width)*4;
      return imageData.data[index+2];
    }

    // Modifico la info de color de cada pixel
    function setPixel(imageData,x,y,r,g,b,a)
      {
        index=(x+y*imageData.width) * 4;
        imageData.data[index+0]=r;
        imageData.data[index+1]=g;
        imageData.data[index+2]=b;
        imageData.data[index+3]=a;
      }

    // Función para descargar la imagen
    function download() {
      var dt = cFinal.toDataURL('image/jpeg').replace("image/png", "image/octet-stream");
      this.href = dt;
    }
    saveJpg.addEventListener('click', download, false);

    function resizeCanvas(image1)
{

    ctxFinal.canvas.height = image1.height;
    ctxFinal.canvas.width = image1.width;
    ctx2.canvas.width = 450;
    ctx2.canvas.height = 340;

}
   
});