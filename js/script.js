$(document).ready(function(){
	console.log("The DOM is ready");
	var player = "x";
	$("div.cell").click( function(){
		this.append(player);
		if (player === "x") {
			player = "o";
		} else {
			player = "x";
		}
	});
	
});