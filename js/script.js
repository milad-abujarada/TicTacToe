$(document).ready(function(){
	console.log("The DOM is ready");
	let $activePlayer = "X", winner = false, totalPlays = 0;
	$("div.cell").click( function(){ 
		// checking if therei is a winner or all the cells were used to stop playing ans show an alert
	 	if ((winner === false) && (totalPlays < 9)) { 
	 		console.log(totalPlays);
	 		let $row = parseInt($(this).attr("class").substring(0,1),10); // geting the clicked cell row
	 		let $column = parseInt($(this).attr("class").substring(1,2),10);//getting the clicked cell column
	 		let $text = $.trim($(this).text());//removing any spaces from the value returned from the clicked cell
	 		console.log($text);
			if (!($text === "X" || $text === "O")){
				$(this).append($activePlayer);
				totalPlays +=1;
				// check for a win
				if (!(totalPlays === 9)){
					//call change turns 
					$activePlayer = changeTurn($activePlayer);

				} else {
					alert("There is no winner this round");
				  }
			} else {
					alert("This cell is used please choose anothor cell");
			  }

		} else {
			alert("There is no winner this round");
		  }
	});
});

//changing the active player
function changeTurn(activePlayer){
		if (activePlayer === "X") { 
		return "O";
	} else {
		return "X";
	  }
}
/*function checkForWinner(player){
	if (player.firstRow === 36) {
		return true;
	} else if ((player.secondRow === 66) ||(player.secondColumn === 66) || (player.leftDiagonal === 66) || (player.rightDiagonal === 66)) {
		return true;
	} else if (player.thirdRow === 96) {
		return true;	
	} else if (player.firstColumn === 63) {
		return true;
	} else if (player.thirdColumn === 69) {
		return true;
	}else {
		return false;
	};
};

var playerX = {
	firstRow: 0, secondRow: 0, thirdRow: 0, firstColumn: 0, secondColumn: 0, thirdColumn: 0, leftDiagonal: 0, rightDiagonal: 0

};

var playerO = {
	firstRow: 0, secondRow: 0, thirdRow: 0, firstColumn: 0, secondColumn: 0, thirdColumn: 0, leftDiagonal: 0, rightDiagonal: 0

};*/