
//GameBoard will be a unique object that saves the board.
const GameBoard = (function() {
    let gameBoard = [
        [1, 0, 1],
        [1, 1, 0],
        [0, 1, 0]]; //Array that will control the board. 0 => O and 1 => X.


    // Function To Draw the board.
    const DrawBoard = () => {
        let cells = document.getElementsByClassName('cell');

        for(let i = 0; i < cells.length; i++) {
        
            //We use x and y to access a matrix which index go from 0 to 2 
            //depending on the number 'i' that goes from 0 to 8.
            let x = Math.floor(i/3);
            let y = i%3; 
            
            if(gameBoard[x][y] == 1) cells[i].innerHTML = 'X'; 
            else cells[i].innerHTML = 'O'; 
        }
    }

    return {DrawBoard};
})();

//GameFlow will be a unique object that will control the game.
const GameFlow = (function(){

})()

// PlayerFactory will define our players.
const PlayerFactory = () => {

}

GameBoard.DrawBoard();