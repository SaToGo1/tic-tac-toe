/*
##########################################################
#  GameBoard Module
#
# GameBoard will be a unique object that saves the board.
# modify and draws the board.
##########################################################
*/
const GameBoard = (function() {

    // ###################
    // #  Private Logic  #
    // ###################

    //Array that will control the board. 0 => 'O' and 1 => 'X' and 2 => ' ' empty.
    let _gameBoard = [
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2]]; 

    //will check if the row 3 times the same mark, 
    //we only need to know in which row( y ) we are right now.
    const _CheckRow = (y) => {
        if((_gameBoard[y][0] == _gameBoard[y][1]) && (_gameBoard[y][0] == _gameBoard[y][2])){
            console.log("there are 3 in a row (rows)")
            return true;
        }
        return false;
    }

    //will check if the column 3 times the same mark, 
    //we only need to know in which column( x ) we are right now.
    const _CheckColumn = (x) => {
        if((_gameBoard[0][x] == _gameBoard[1][x]) && (_gameBoard[0][x] == _gameBoard[2][x])){
            console.log("there are 3 in a row (columns)")
            return true;
        }
        return false;
    }

    
    const _checkDiagonal = () => {
        //if the diagonal is the same Marks
        if((_gameBoard[1][1] == _gameBoard[0][0]) && (_gameBoard[1][1] == _gameBoard[2][2])){
            // And the diagonal is different from empty ( 2 in gameboard). 
            if((_gameBoard[1][1] != 2) && (_gameBoard[0][0] != 2) && (_gameBoard[2][2] != 2)){
                console.log("there are 3 in a row (diagonal 1)")
                return true;
            }
        
        //if the diagonal is the same Marks
        } else if((_gameBoard[1][1] == _gameBoard[0][2]) && (_gameBoard[1][1] == _gameBoard[2][0])){
            // And the diagonal is different from empty ( 2 in gameboard).
            if((_gameBoard[1][1] != 2) && (_gameBoard[0][2] != 2) && (_gameBoard[2][0] != 2)){
                console.log("there are 3 in a row (diagonal 2)")
                return true;
            }
        }
        return false;
    }

    // passes from array index to matrix index.
    // GET
    //   index => number from 0 to 8.
    // RETURN
    //   x => 0 to 2
    //   y => 0 to 2
    const _ArrayIndexToMatrix = (index) => {
        //We use x and y to access a matrix which index go from 0 to 2 
        //depending on the number 'index' that goes from 0 to 8.
        let y = Math.floor(index/3);
        let x = index%3;
        return [ x, y ];
    }

    // ###################
    // #  Public         #
    // ###################

    // Function To Draw the board.
    const DrawBoard = () => {
        let cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
        
            //get the matrix index from linear 0-8 Index.
            let [x, y] = _ArrayIndexToMatrix(i);
            
            if(_gameBoard[y][x] == 1) cells[i].innerHTML = 'X'; 
            else if(_gameBoard[y][x] == 0) cells[i].innerHTML = 'O'; 
            else cells[i].innerHTML = ' ';// otherwise empty cell
        }
    }

    //Place a Mark in the GameBoard,
    // i      => 0 to 8, will be the cell ID.
    //numMark => 0 or 1, will define the board mark.
    const PlaceMark = (i, numMark) => {

        //get the matrix index from linear 0-8 Index.
        let [x, y] = _ArrayIndexToMatrix(i);

        // if the board cell is empty we put the mark we get from
        // numMark, if board is 0 or 1 we don't put a mark.
        if(_gameBoard[y][x] == 2) _gameBoard[y][x] = numMark;

        // Actualize Board
        DrawBoard();
    }

    //Check if there is 3 marks in a row
    //Get 
    //  index => index from the array of cells.
    //Return
    //  true or false, true if any combination of 3 marks. 
    const Check3InARow = (index) => {
        let threeInARow = false;
        let [x, y] = _ArrayIndexToMatrix(index);
        
        threeInARow = (_CheckRow(y) || _CheckColumn(x) || _checkDiagonal());
        
        return threeInARow;
    }

    //Check if all the cells are different from 2 ("Empty")
    //so it means the board is filled.
    //RETURN => true or false
    const BoardFilled = () => {
        // if every cell is different from 2, there are not empty spaces and we may have a tie.
        let differentFrom2 = _gameBoard.every(function(row){
            return row.every(function(cell){
                return cell != 2;
            });
        });

        return differentFrom2;
    }

    const restart = () => {
        _gameBoard = [
            [2, 2, 2],
            [2, 2, 2],
            [2, 2, 2]];
        
        DrawBoard();
    }

    return {DrawBoard, PlaceMark, Check3InARow, BoardFilled, restart};
})();


/*
##########################################################
#  Player Factory
#
# PlayerFactory will define produce players.
# numMark => 0 or 1, equals to the mark the players put on the board X or O.
# playerName => string with name of the player.
##########################################################
*/
const PlayerFactory = (numMark, playerName) => {

    let _numMark = numMark;
    let _name = playerName;

    // putMark passes the number of cell and the mark
    // to place to the GameBoard Object.
    // i =>gets the number of the cell
    const putMark = (i) => {
        GameBoard.PlaceMark(i, _numMark);
    }

    const getName = () => {
        return _name;
    }

    return {putMark, getName};
}


/*
##########################################################
#  Game Flow Module
#
# GameFlow will be a unique object that will control the game.
##########################################################
*/
const GameFlow = (function(){

    // ###################
    // #  Private Logic  #
    // ###################

    // We define our 2 players
    const _playerO = PlayerFactory(0, "Player O");
    const _playerX = PlayerFactory(1, "Player X");

    let _playerTurn = _playerO;

    let _win = false;
    let _tie = false;

    _infoDOM = document.getElementById("info");

    const _ChangeActualPlayer = () => {
        _DisplayPlayer(_playerTurn);

        if(_playerTurn == _playerO) _playerTurn = _playerX;
        else _playerTurn = _playerO;
    }

    const _MainGameFlow = function(cellNumber){
        if(!(_win) && !(_tie)) {

            //this is a bit confusing our first player to play is playerX
            //as we change the player first thing entering the game flow
            //to start with playerX we have to set PlayerO as initial 
            //player turn 
            _ChangeActualPlayer();
            _playerTurn.putMark(cellNumber);

            //check if we have winner
            _win = GameBoard.Check3InARow(cellNumber);         
            //check if we have a tie
            if(!(_win)) _tie = GameBoard.BoardFilled();
            
            //If win or the show message
            if(_win) _DisplayWin();
            else if(_tie) _DisplayTie();
        } else{
            if(_win) _DisplayWin();
            else if(_tie) _DisplayTie();
        }
    }

    const _DisplayPlayer = (player) => {
        _infoDOM.innerHTML = player.getName() + " Turn";
    }

    const _DisplayWin = () => {
        _infoDOM.innerHTML = _playerTurn.getName() + " Win";
    }

    const _DisplayTie = () => {
        _infoDOM.innerHTML = "TIE";
    }

    const _restart = () => {
        GameBoard.restart();
        _tie = false;
        _win = false;

        //remember to start with playerX we set up playerO as initial.
        _playerTurn = _playerO;
        _DisplayPlayer(_playerX);
    }

    const _SelectPlayer = (buttonSelected, secondButton, PlayerSelected, secondPlayer) => {
        buttonSelected.style.borderBottom = "thick solid black";
        secondButton.style.borderBottom = "none";
        _restart();
    }

    // ###################
    // #  Public         #
    // ###################

    //Make an event for every cell, onclick we change the board and change the player turn.
    const InitializeGameEvents = () => {
        let cells = document.getElementsByClassName('cell');
        let restart = document.getElementById('restartButton');
        let buttonX = document.getElementById('playerX');
        let buttonO = document.getElementById('playerO');

        //add click event to the cells.
        for(let i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', function(){
                _MainGameFlow(i);
            });
        }

        // Add click event to restart button.
        restart.addEventListener('click', function(){
            _restart();
        });

        buttonX.addEventListener('click', function(){
            _SelectPlayer(buttonX, buttonO);
        });

        buttonO.addEventListener('click', function(){
            _SelectPlayer(buttonO, buttonX);
        });


    }

    return {InitializeGameEvents}
})();

GameBoard.DrawBoard();
GameFlow.InitializeGameEvents();