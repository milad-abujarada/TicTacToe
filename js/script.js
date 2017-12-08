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
				if (totalPlays >= 5) { //console.log(whichCellClicked($row, $column)); console.log($board);
					/*calling whichCellClicked to find out the cell the activePlayer clicked on and based on that
					function centerCell, crossCell, forwadDiagonalCell, or backwardDiagonalCell is called*/
					let clickedCell = whichCellClicked($row, $column);
					if (clickedCell === "center cell") {
						if (centerCell($board, $row, $column, $activePlayer)){
							$winner = true;
							declarWinner($activePlayer);
						};
					} else if (clickedCell === "backward diagonal") { 
						if (backwardDiagonalCell($board, $row, $column, $activePlayer)){ 
							$winner = true;
							declarWinner($activePlayer); 
						};
					} else if (clickedCell === "forward diagonal") {
						if (forwardDiagonalCell($board, $row, $column, $activePlayer)){ 
							$winner = true; 
							declarWinner($activePlayer); 
						}
					} else if (clickedCell === "cross cell"){
						if (crossCell($board, $row, $column, $activePlayer)){
							$winner = true; 
							declarWinner($activePlayer);
						}
					};
				};
				if (totalPlays < 9 && !($winner)){
					//call changeTurn to change the activePlayer 
					$activePlayer = changeTurn($activePlayer);
				} else if (!($winner)){
					noWinner();
				  }
			} else {
				alert("This cell is used please choose anothor cell");
			  }

		} else { 
			if ($winner === true) {
				declarWinner($activePlayer);
			} else {
				noWinner()
			};
			
		};
	});
});

//changeTurn changes the activePlayer
function changeTurn(activePlayer){
		if (activePlayer === "X") { 
		return "O";
	} else {
	    return "X";
	  };
};

//noWinner declares a tie game
function noWinner(){
	alert("It's a tie game!!! There is no winner this round");
};

//winner declaration
function declarWinner(activePlayer){
	alert("Congrats!!! player " + activePlayer + " has won!!!")
}

//whichCellClicked to find which cell the activePlayer clicked on 
function whichCellClicked(clickedRow, clickedColumn){
	if ((clickedRow === clickedColumn) && ((clickedRow + clickedColumn) === 2)) {
		return "center cell";
	} else if (clickedRow === clickedColumn){
		return "backward diagonal";
	} else if ((clickedRow + clickedColumn) === 2){
		return "forward diagonal";
	} else {
		return "cross cell"
	};
};

/*centerCell function checks after the player clicks on the center cell for a win by calling 
four functions that will check the row, column, forward diagonal and backward diagonal the cell falls on*/
function centerCell(board, clickedRow, clickedColumn, activePlayer) {
	if (checkRow(board, clickedRow, clickedColumn, activePlayer)){
		return true;
	} else if (checkColumn(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkForwardDiagonal(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	}else if (checkBackwordDiagonal(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	};
};

function backwardDiagonalCell (board, clickedRow, clickedColumn, activePlayer) {
	if (checkRow(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkColumn(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkBackwordDiagonal(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	};
};

function forwardDiagonalCell (board, clickedRow, clickedColumn, activePlayer) {
	if (checkRow(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkColumn(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkForwardDiagonal(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	};
};

function crossCell (board, clickedRow, clickedColumn, activePlayer) {
	if (checkRow(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	} else if (checkColumn(board, clickedRow, clickedColumn, activePlayer)) {
		return true;
	};
};

function checkRow(board, clickedRow, clickedColumn, activePlayer) {
	if ((board[clickedRow][(clickedColumn + 1)%3] === activePlayer) && ((board[clickedRow][(clickedColumn + 2)%3] === activePlayer))){		
		return true;
	};
};

function checkColumn(board, clickedRow, clickedColumn, activePlayer) {
	if ((board[(clickedRow+ 1)%3][clickedColumn] === activePlayer) && ((board[(clickedRow+ 2)%3][clickedColumn] === activePlayer))){
		return true;
	};
};

function checkForwardDiagonal(board, clickedRow, clickedColumn, activePlayer) {
	if(clickedRow > clickedColumn) {
		if ((board[(clickedRow - 1)][(clickedColumn + 1)] === activePlayer) && ((board[clickedColumn][clickedRow] === activePlayer))){
			return true; 
		}; 
	} else if (clickedRow < clickedColumn) { 
		if ((board[(clickedRow + 1)][(clickedColumn - 1)] === activePlayer) && ((board[clickedColumn][clickedRow] === activePlayer))){
				return true; 
		};
	} else if (clickedRow === clickedColumn) {
		if ((board[(clickedRow + 1)][(clickedColumn + 1)] === activePlayer) && ((board[clickedRow - 1][clickedColumn - 1] === activePlayer))){
				return true; 
		};
	};
};
function checkBackwordDiagonal(board, clickedRow, clickedColumn, activePlayer){
	if ((clickedColumn + clickedRow) === 0){
		if ((board[(clickedRow + 1)][(clickedColumn + 1)] === activePlayer) && ((board[clickedRow + 2][clickedColumn + 2] === activePlayer))){ 
			return true; 
		}; 
	} else if ((clickedColumn + clickedRow) === 4){
		if ((board[(clickedRow - 1)][(clickedColumn - 1)] === activePlayer) && ((board[clickedRow - 2][clickedColumn - 2] === activePlayer))){ 
			return true; 
		};
	} else if ((clickedRow + clickedColumn === 2)){
		if ((board[(clickedRow - 1)][(clickedColumn - 1)] === activePlayer) && ((board[clickedRow + 1][clickedColumn + 1] === activePlayer))){ 
			return true; 
		};}; 
};
