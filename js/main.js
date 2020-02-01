/*------Constants------*/

/*------Variables (state)------*/
let player;
let winner;
let board;
let count = 1;

// Variables might include (board/turn/winner)

/*------Cached Element References------*/
const playAgain = document.getElementById('play');
const message = document.getElementById('message');

// You might choose to put your game status here

/*------Event Listeners------*/
document.getElementById('board').addEventListener('click', click);
playAgain.addEventListener('click', initialize);

// This is where you should put the event listener
// for a mouse-click

/*------Functions------*/
initialize();

function initialize() {
    board = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];


    render();
}

function checkWinner() {
    if (board[0]+board[1]+board[2] === 3 ||
        board[0]+board[3]+board[6] === 3 ||
        board[0]+board[4]+board[8] === 3 ||
        board[1]+board[4]+board[7] === 3 ||
        board[2]+board[4]+board[6] === 3) {
        board[2]+board[5]+board[8] === 3 ||  
        board[3]+board[4]+board[5] === 3 ||
        board[6]+board[7]+board[8] === 3 ||  
        message.textContent = "X's win!";
        winner = true;
    }   
    if (board[0]+board[1]+board[2] === -3 ||
        board[0]+board[3]+board[6] === -3 ||
        board[0]+board[4]+board[8] === -3 ||
        board[1]+board[4]+board[7] === -3 ||
        board[2]+board[4]+board[6] === -3) {
        board[2]+board[5]+board[8] === -3 ||  
        board[3]+board[4]+board[5] === -3 ||
        board[6]+board[7]+board[8] === -3 ||  
        message.textContent = "O's win!";
        winner = true;
    }  
}

function click(event) {
    let square = parseInt(event.target.id.replace('sq', ''));
    if (board[square] !== 'null')
        return;
    checkWinner();
    playAgain.style.visibility = checkWinner() ? 'visible' : 'hidden';
    render(square);
}

function render(square) {
    if (winner === false) {
        markSpot = document.getElementById(`sq${square}`);
        board[square] = turn;
        if (turn === 1) {
            markSpot.textContent = "X";
            message.textContent = "O's Go!";
        } else {
            markSpot.textContent = "O";
            message.textContent = "X's Go!";
        }
    }
    player *= -1;
    checkWinner();
    count = count + 1;

    if (count === 10 && getWinner === false) {
        message.textContent = "Draw!";
    }
}

// Some functions you might choose to use:

// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading

// On-Click function:
// Set up what happens when one of the elements
// is clicked


// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so


// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// either X or O depending on whose turn it is