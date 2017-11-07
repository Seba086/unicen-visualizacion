$(document).ready(function(){
	document.getElementById("likeHeart").addEventListener("click", likeChangeState);
	document.getElementById("grid").addEventListener("click", setGridActive);
	document.getElementById("gallery").addEventListener("click", setGalleryActive);
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
		document.getElementById('tweet1').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";
		document.getElementById('tweet2').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";
		document.getElementById('tweet3').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";
		document.getElementById('tweet4').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";
		document.getElementById('tweet5').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";
		document.getElementById('tweet6').className = "col-lg-4 col-sm-3 col-md-6 btn-group btn-group-sm";

		var captions = document.getElementsByClassName('caption');
	    for (i = 0; i < captions.length; i++) {
	      captions[i].style.display = 'inline';
 	    }
	}

	function switchToGallery(){
		document.getElementById('tweet1').className = "col-lg-8 offset-lg-2 col-md-7 offset-md-2 firstItem btn-group btn-group-sm";
		document.getElementById('tweet2').className = "col-lg-2 offset-lg-2 col-md-2 offset-md-2 btn-group btn-group-sm clearfix";
		document.getElementById('tweet3').className = "col-lg-2 col-md-2 btn-group btn-group-sm clearfix";
		document.getElementById('tweet4').className = "col-lg-2 col-md-2 btn-group btn-group-sm clearfix";
		document.getElementById('tweet5').className = "col-lg-2 col-md-2 btn-group btn-group-sm clearfix";
		document.getElementById('tweet6').className = "col-lg-2 col-md-2 btn-group btn-group-sm clearfix";

		var captions = document.getElementsByClassName('caption');
	    for (i = 0; i < captions.length; i++) {
	      captions[i].style.display = 'none';
 	    }


	}	

	setGridActive();

});	
