// ANIMACIONES

//VARIABLES

var imagenesXHashtag = [];

 function likeChangeState(){
    this.className = "likedHeart";
}


function setGridActive(){
    this.className = "material-icons viewMode active";
    document.getElementById("gallery").className = "material-icons viewMode";
    switchToGrid();
}
function setGalleryActive(){
    this.className = "material-icons viewMode active";
    document.getElementById("grid").className = "material-icons viewMode";
    switchToGallery();
}	

function switchToGrid(){
    imagenesXHashtag.forEach(element => {
        console.log(element.id);
            document.getElementById(element.id).className = "display-flex col-lg-3 col-sm-1 col-md-3";
    });

    var captions = document.getElementsByClassName('caption');
    for (i = 0; i < captions.length; i++) {
      captions[i].style.display = 'inline';
     }
     document.getElementById("tweetsContainer").innerHTML = "";
     imagenesXHashtag.forEach(element => {
        if(element != null){
            document.getElementById("tweetsContainer").innerHTML +=
            '<div id="' + element.id + '" class="display-flex col-lg-3 col-sm-1 col-md-3">'
            + '<div class="thumbnail">'
            + '<img class="gridHeight img-fluid img-thumbnail img-responsive" src="' + element.url
            + '"/><div class="caption">'
            + '<p class="singleTweet"><span id="likeHeart" class="likedHeart"></span> <span id="likesCount">' + element.likes + '</span> Likes'
            + '<i class="material-icons">loop</i> ' + element.retweets + ' Retweets'
            + '</div></div></div>';
           }
     });
     document.getElementById('layout').style.display = "inline";
     //activarLayout();
}

function switchToGallery(){
    //document.getElementById(imagenesXHashtag[0].id).className = "galleryHeight col-lg-8 offset-lg-3 col-md-7 offset-md-2 firstItem btn-group btn-group-sm clearfix";
    for(i=1; i<imagenesXHashtag.length;i++){
            //console.log('elemento ' + i + ' ' + imagenesXHashtag[i].id);
            document.getElementById(imagenesXHashtag[i].id).className = "miniGalleryThumb col-lg-2 col-md-2 btn-group btn-group-sm clearfix";
    }

    var captions = document.getElementsByClassName('caption');
    for (i = 1; i < captions.length; i++) {
      captions[i].style.display = 'none';
     }

     document.getElementById("tweetsContainer").innerHTML = "";
     imagenesXHashtag.forEach(element => {
        if(element != null){
            document.getElementById("tweetsContainer").innerHTML +=
            '<div id="' + element.id + '" class="display-flex col-lg-3 col-sm-1 col-md-3">'
            + '<div class="thumbnail">'
            + '<img class="rotateIn |gridHeight img-fluid img-thumbnail img-responsive" src="' + element.url
            + '"/><div class="caption">'
            + '<p class="singleTweet"><span id="likeHeart" class="likedHeart"></span> <span id="likesCount">' + element.likes + '</span> Likes'
            + '<i class="material-icons">loop</i> ' + element.retweets + ' Retweets'
            + '</div></div></div>';
           }
     });
     document.getElementById('layout').style.display = "inline";
     document.getElementById(imagenesXHashtag[0].id).className = "rotateIn col-lg-8 offset-lg-2 col-md-7 offset-md-2 firstItem btn-group btn-group-sm clearfix";
}	

// Carga de Tweets
$(document).ready(function(){
    
    // var Codebird = require("codebird");
    // creamos una instancia  de corebird
    var cb = new Codebird;
    
    cb.setProxy("https://cb-proxy.herokuapp.com/");
    // configuramos ConsumerKey
    cb.setConsumerKey("xtbiN6O12KIXJuL0ZhEThrMlE", "D43xWnJ77YTIrsFYRD2JSs9YbuDgcCKpBAYZ4qR2T3Pr3XoItm");
    //configuramos el token
    cb.setToken("2422393664-kTvJvaEaFkJzdLVYk4kJDaR2h0uhbA8zrT1wyQT", "459Zg6FS3Vfch7qMPPijZUKrhbk3Y4If4W9RzI7Ga0PKZ");
    
    document.getElementById("search").addEventListener("click", cargarDatos);      
    document.getElementById("hashtag").addEventListener("focus", function(){
        window.addEventListener('keydown',function(e){
            if(e.keyCode == 13) cargarDatos();
        });
    });

    function cargarDatos() {
        
        var hashtag = "#" + $("#hashtag").val() + " filter:images";
        document.getElementById('searchHashtag').innerHTML = $("#hashtag").val();
        //console.log(hashtag);
        document.getElementById("tweetsContainer").innerHTML = '<div class="loading"><p>Cargando...</p></div>';
        var params = {
            q: hashtag,
            result_type: "mixed",
            count:100,
            include_entities: "true"
        };
    
        cb.__call(
            "search_tweets",
            params,
            function (reply) {
                document.getElementById("tweetsContainer").innerHTML = " ";
                imagenesXHashtag =[];
                //console.log(params);
                //console.log(reply);
               
                for (var i = 0; i < reply.statuses.length; i++) {
                   var t = reply.statuses[i];
                   //console.log(reply.statuses.length);
                   if ((t.extended_entities != null) && (t.entities.media != null) && (t.extended_entities.media[0].type == "photo")) {
                    //console.log('Entró ' + i );
                    //alert('entre por ' + j + 'vez');
                    var data = {
                       url: t.extended_entities.media[0].media_url_https,
                       likes: t.favorite_count,
                       id: t.id_str,
                       retweets: t.retweet_count
                     };
                     //console.log(data);
                   
                        imagenesXHashtag.push(data);
                     
                     
                     //console.log('imagenesXHashtag:' + imagenesXHashtag.length);
                     /*imagenesXHashtag.forEach(element => {
                         console.log(element);
                     });         */            
                   }
                 }
                 imagenesXHashtag.forEach(element => {
                    if(element != null){
                        document.getElementById("tweetsContainer").innerHTML +=
                        '<div id="' + element.id + '" class="display-flex col-lg-3 col-sm-1 col-md-3">'
                        + '<div class="thumbnail">'
                        + '<img class="gridHeight img-fluid img-thumbnail img-responsive" src="' + element.url
                        + '"/><div class="caption">'
                        + '<p class="singleTweet"><span id="likeHeart" class="likedHeart"></span> <span id="likesCount">' + element.likes + '</span> Likes'
                        + '<i class="material-icons">loop</i> ' + element.retweets + ' Retweets'
                        + '</div></div></div>';
                       }
                 });
                 document.getElementById('layout').style.display = "inline";
                 activarLayout();
            }
        );
        
        //console.log(imagenesXHashtag.length);
    }

    function activarLayout(){
        //document.getElementsByClassName("likeHeart").addEventListener("load", likeChangeState);
        document.getElementById("grid").addEventListener("click", setGridActive);
        document.getElementById("gallery").addEventListener("click", setGalleryActive);
        setGridActive();
    }
    
    
    });


   