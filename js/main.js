/*------Variables (state)------*/
let player;
let board;
let count = 1;
let winner = false;

/*------Cached Element References------*/
const playAgain = document.getElementById('play');
const message = document.getElementById('message');

/*------Event Listeners------*/
document.querySelector('section.board').addEventListener('click', click);

/*------Functions------*/
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    player = 1;
    message.textContent = "X's Go First!";
    playAgain.style.visibility = 'hidden';
}

function gameOver() {
    return ((count === 10 && winner === false) || winner === true);
}

function click(event) {
    let square = parseInt(event.target.id.replace('sq', ''));
    if (board[square] !== '')
    return;
    checkWinner();
    render(square);
}

function checkWinner() {
    if (board[0]+board[1]+board[2] === 3 || 
        board[0]+board[3]+board[6] === 3 || 
        board[0]+board[4]+board[8] === 3 || 
        board[1]+board[4]+board[7] === 3 || 
        board[2]+board[4]+board[6] === 3 ||
        board[2]+board[5]+board[8] === 3 || 
        board[3]+board[4]+board[5] === 3 || 
        board[6]+board[7]+board[8] === 3){
        message.textContent = "X's win!";
        winner = true;
    }   
    if (board[0]+board[1]+board[2] === -3 || 
        board[0]+board[3]+board[6] === -3 || 
        board[0]+board[4]+board[8] === -3 || 
        board[1]+board[4]+board[7] === -3 || 
        board[2]+board[4]+board[6] === -3 ||
        board[2]+board[5]+board[8] === -3 || 
        board[3]+board[4]+board[5] === -3 || 
        board[6]+board[7]+board[8] === -3){
        message.textContent = "O's win!";
        winner = true;
    }
}
    
function render(square) {
    if (winner === false) {
        markSpot = document.getElementById(`sq${square}`);
        board[square] = player;
        if (player === 1) {
            markSpot.textContent = "X";
            message.textContent = "O's Go!";
        } else {
            markSpot.textContent = "O";
            message.textContent = "X's Go!";
        }
    }
    player *= -1;
    checkWinner();
    count++;
    if (count === 10 && winner === false) {
    message.textContent = "Draw!";
    }
    playAgain.style.visibility = gameOver() ? 'visible' : 'hidden';
}

init();