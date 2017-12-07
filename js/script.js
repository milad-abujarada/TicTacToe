$(document).ready(function(){
	console.log("The DOM is ready");
	let $activePlayer = "X", $winner = false, totalPlays = 0, $board = [[],[],[]];
	$("div.cell").click( function(){ 
		// checking if there is a winner or all the cells were used to stop playing and show an alert
	 	if (($winner === false) && (totalPlays < 9)) { 
	 		let $row = parseInt($(this).attr("class").substring(0,1),10); //geting the clicked cell row
	 		let $column = parseInt($(this).attr("class").substring(1,2),10); //getting the clicked cell column
	 		let $text = $.trim($(this).text()); //removing any spaces from the value returned from the clicked cell
			if (!($text === "X" || $text === "O")){
				$(this).append($activePlayer); //redrawing the board
				$board[$row][$column] = $activePlayer; //recreating the game as an array
				totalPlays +=1;
				console.log(totalPlays);
				// check for a win only if at least 5 plays were made
				if (totalPlays >= 5) {

					if (whichCellClicked($row, $column) === "corner cell"){
						console.log("corner cell");
						if (cornerCell($board, $row, $column, $activePlayer)){
							$winner = true;
							declarWinner($activePlayer);
						}

						
					}
				}
				if (!(totalPlays === 9)){
					//call change turns 
					$activePlayer = changeTurn($activePlayer);

				} else {
					noWinner();
				  }
			} else {
				alert("This cell is used please choose anothor cell");
			  }

		} else {
			noWinner();
			
		  };
	});
});

//changing the active player
function changeTurn(activePlayer){
		if (activePlayer === "X") { 
		return "O";
	} else {
	    return "X";
	  };
};

//no winner
function noWinner(){
	alert("There is no winner this round");
};

function declarWinner(activePlayer){
	alert("Congrats!!! player " + activePlayer + " has won!!!")
}

function whichCellClicked(clickedRow, clickedColumn){
	if (((clickedRow === clickedColumn) && (clickedRow + clickedColumn !== 2)) || ((clickedRow + clickedColumn === 2) && (clickedRow !== clickedColumn))) {
		return "corner cell";
	};
};

//corner cell
/*function cornerCell(board, clickedRow, clickedColumn, activePlayer){
	//add the i+j mod 3 = 2
	if ((board[(clickedRow + 1)%3][clickedColumn] === activePlayer) && ((board[(clickedRow + 2)%3][clickedColumn] === activePlayer))){
		
		return true;
	}
	else 
	else 
	
};*/

function checkRow(board, clickedRow, clickedColumn, activePlayer) {
	if ((board[clickedRow][(clickedColumn + 1)%3] === activePlayer) && ((board[clickedRow][(clickedColumn + 2)%3] === activePlayer))){		
		return true;
	};
};

function checkColumn(board, clickedRow, clickedColumn, activePlayer) {
	if ((board[(clickedRow+ 1)%3][(clickedColumn + 1)%3] === activePlayer) && ((board[(clickedRow+ 1)%3][(clickedColumn + 1)%3] === activePlayer))){
		return true;
	};
};

function checkForwardSlash(board, clickedRow, clickedColumn, activePlayer) {
	if(clickedRow > clickedColumn) {
		if ((board[(clickedRow - 1)][(clickedColumn + 1)] === activePlayer) && ((board[clickedColumn][clickedRow] === activePlayer))){
			return true; 
		} else { 
			if ((board[(clickedRow + 1)][(clickedColumn - 1)] === activePlayer) && ((board[clickedColumn][clickedRow] === activePlayer))){
				return true; 
			};
		};
	};
};
function checkBackwordSlash(board, clickedRow, clickedColumn, activePlayer){
	if ((clickedColumn + clickedRow) === 0){
		if ((board[(clickedRow + 1)][(clickedColumn + 1)] === activePlayer) && ((board[clickedRow + 2][clickedColumn + 2] === activePlayer))){ 
			return true; 
		} else { 
			if ((board[(clickedRow - 1)][(clickedColumn - 1)] === activePlayer) && ((board[clickedRow - 2][clickedColumn - 2] === activePlayer))){ 
				return true; 
			}; 
		}; 
	};
};
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