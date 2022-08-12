
//GameBoard will be a unique object that saves the board.
const GameBoard = (function() {
    let gameBoard = [
        [1, 0, 1],
        [1, 1, 0],
        [0, 1, 0]]; 
        //Array that will control the board. 0 => 'O' and 1 => 'X' or 2 => ' ' empty.

    // Function To Draw the board.
    const DrawBoard = () => {
        let cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
        
            //We use x and y to access a matrix which index go from 0 to 2 
            //depending on the number 'i' that goes from 0 to 8.
            let x = Math.floor(i/3);
            let y = i%3; 
            
            if(gameBoard[x][y] == 1) cells[i].innerHTML = 'X'; 
            else if(gameBoard[x][y] == 0) cells[i].innerHTML = 'O'; 
            else cells[i].innerHTML = ' ';// otherwise empty cell
        }
    }

    //Place a Mark in the GameBoard,
    // i      => 0 to 8, will be the cell ID.
    //numMark => 0 or 1, will define the board mark.
    const PlaceMark = (i, numMark) => {

        //get the matrix index from linear 0-8 ID.
        let x = Math.floor(i/3);
        let y = i%3;

        // if the board cell is empty we put the mark we get from
        // numMark, if board is 0 or 1 we don't put a mark.
        if(gameBoard[x][y] == 2) gameBoard[x][y] = numMark;

        // Actualize Board
        DrawBoard();
    }

    return {DrawBoard, PlaceMark};
})();

//GameFlow will be a unique object that will control the game.
const GameFlow = (function(){

    // We define our 2 players
    const playerO = PlayerFactory(0);
    const playerX = PlayerFactory(1);


})()

// PlayerFactory will define our players.
// numMark => 0 or 1, equals to the mark the players put on the board X or O.
const PlayerFactory = (numMark) => {

    let _numMark = numMark;

    /*const clickBoard = () => {
        GameBoard.PlaceMark(_numMark);
    }*/

    return {};
}

GameBoard.DrawBoard();

