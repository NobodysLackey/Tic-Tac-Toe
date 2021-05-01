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
playAgain.addEventListener('click', init);

/*------Functions------*/
init();

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    player = 1;
    message.textContent = "X'S GO FIRST!";
    message.classList.add('animated', 'pulse', 'infinite', 'fast');
    playAgain.style.visibility = 'hidden';

    allSquares = document.querySelectorAll('section.board')[0].childNodes

    allSquares.forEach((element) => {
        element.textContent = ""
        element.color = ""
    })

    count = 1;
    winner = false;
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
        message.textContent = "X'S WIN!";
        message.style.color = "rgba(223, 254, 215, 0.913)";
        message.classList.add('animated', 'pulse', 'infinite', 'fast');
        winner = true;
        playAgain.classList.add('animated', 'jello', 'fast');
    }   
    if (board[0]+board[1]+board[2] === -3 || 
        board[0]+board[3]+board[6] === -3 || 
        board[0]+board[4]+board[8] === -3 || 
        board[1]+board[4]+board[7] === -3 || 
        board[2]+board[4]+board[6] === -3 ||
        board[2]+board[5]+board[8] === -3 || 
        board[3]+board[4]+board[5] === -3 || 
        board[6]+board[7]+board[8] === -3){
        message.textContent = "O'S WIN!";
        message.style.color = "rgba(198, 224, 255, 0.913)";
        message.classList.add('animated', 'pulse', 'infinite', 'fast');
        winner = true;
        playAgain.classList.add('animated', 'jello', 'fast');
    }
}
    
function render(square) {
    if (winner === false) {
        markSpot = document.getElementById(`sq${square}`);
        board[square] = player;
        if (player === 1) {
            markSpot.textContent = "X";
            markSpot.style.color = "rgba(223, 254, 215, 0.913)";
            message.textContent = "O'S GO!";
            message.classList.remove('animated', 'pulse', 'infinite', 'fast');
        } else {
            markSpot.textContent = "O";
            markSpot.style.color = "rgba(198, 224, 255, 0.913)";
            message.textContent = "X'S GO!";
        }
    }
    player *= -1;
    checkWinner();
    count++;
    if (count === 10 && winner === false) {
    message.textContent = "DRAW!";
    message.style.color = "rgba(255, 217, 223, 0.913)";
    message.classList.add('animated', 'pulse', 'infinite', 'fast');
    playAgain.classList.add('animated', 'jello', 'fast');
    }
    playAgain.style.visibility = gameOver() ? 'visible' : 'hidden';
}
