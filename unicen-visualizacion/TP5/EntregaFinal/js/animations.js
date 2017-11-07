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
	}
	function setGalleryActive(){
		this.className = "material-icons viewMode active";
		document.getElementById("grid").className = "material-icons viewMode";
	}	
	setGridActive();
});