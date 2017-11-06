$(document).ready(function(){
	document.getElementById("likeHeart").addEventListener("click", likeChangeState);

	function likeChangeState(){
		this.className = "likedHeart";
	}
});