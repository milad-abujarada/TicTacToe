$(document).ready(function(){
	console.log("The DOM is ready");
	var player = "X";
 	$("div.cell").click( function(){ 
 		let $text = $.trim($(this).text());
 		console.log($text);
		if (!($text === "X" || $text === "O")){
			$(this).append(player);
			if (player === "X") {
				player = "O";
			} else {
				player = "X";
			}
		} else {
				alert("This cell is used please choose anothor cell");
		}

	});
	
});