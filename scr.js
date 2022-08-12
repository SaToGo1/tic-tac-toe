//GameBoard will be a unique object that saves the board.
// modify and draws the board.
const GameBoard = (function() {

    // ###################
    // #  Private Logic  #
    // ###################

    //Array that will control the board. 0 => 'O' and 1 => 'X' or 2 => ' ' empty.
    let _gameBoard = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2]]; 


    // ###################
    // #  Public         #
    // ###################

    // Function To Draw the board.
    const DrawBoard = () => {
        let cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
        
            //We use x and y to access a matrix which index go from 0 to 2 
            //depending on the number 'i' that goes from 0 to 8.
            let x = Math.floor(i/3);
            let y = i%3; 
            
            if(_gameBoard[x][y] == 1) cells[i].innerHTML = 'X'; 
            else if(_gameBoard[x][y] == 0) cells[i].innerHTML = 'O'; 
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
        if(_gameBoard[x][y] == 2) _gameBoard[x][y] = numMark;

        // Actualize Board
        DrawBoard();
    }

    return {DrawBoard, PlaceMark};
})();


// PlayerFactory will define our players.
// numMark => 0 or 1, equals to the mark the players put on the board X or O.
const PlayerFactory = (numMark) => {

    let _numMark = numMark;

    // putMark passes the number of cell and the mark
    // to place to the GameBoard Object.
    // i =>gets the number of the cell
    const putMark = (i) => {
        GameBoard.PlaceMark(i, _numMark);
    }

    return {putMark};
}


//GameFlow will be a unique object that will control the game.
const GameFlow = (function(){

    // ###################
    // #  Private Logic  #
    // ###################

    // We define our 2 players
    const _playerO = PlayerFactory(0);
    const _playerX = PlayerFactory(1);

    let _playerTurn = _playerO;

    const _ChangeActualPlayer = () => {
        if(_playerTurn == _playerO) _playerTurn = _playerX;
        else _playerTurn = _playerO;

    }

    // ###################
    // #  Public         #
    // ###################

    //Make an event for every cell, onclick we change the board and change the player turn.
    const InitializeCellClickEvent = () => {
        let cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function() {
                _playerTurn.putMark(i);
                _ChangeActualPlayer();
            })
        }
    }

    return {InitializeCellClickEvent}
})();

GameBoard.DrawBoard();

GameFlow.InitializeCellClickEvent();