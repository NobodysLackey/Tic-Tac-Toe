/*------Variables (state)------*/
let player
let board
let count = 1
let winner = false
let xWin = 0
let oWin = 0
let dWin = 0

/*------Cached Element References------*/
const playAgain = document.getElementById('play')
const message = document.getElementById('message')
const counter = document.getElementById('counter')
const x = document.getElementById('Xscore')
const o = document.getElementById('Oscore')
const d = document.getElementById('Dscore')

/*------Event Listeners------*/
document.querySelector('section.board').addEventListener('click', click)
playAgain.addEventListener('click', init)

/*------Functions------*/
init()

function init() {
  board = ['', '', '', '', '', '', '', '', '']
  player = 1
  x.innerText = xWin
  o.innerText = oWin
  d.innerText = dWin
  message.textContent = "X'S GO FIRST!"
  message.classList.add('animated', 'pulse', 'infinite', 'fast')
  message.style.color = 'rgba(255, 254, 234, 0.913)'
  playAgain.style.visibility = 'hidden'
  playAgain.classList.remove('animated', 'jello', 'fast')

  document
    .querySelectorAll('section.board')[0]
    .childNodes.forEach((element) => {
      element.textContent = ''
      element.color = ''
    })

  count = 1
  winner = false
}

function gameOver() {
  return (count === 10 && winner === false) || winner === true
}

function click(event) {
  let square = parseInt(event.target.id.replace('sq', ''))
  if (board[square] !== '') return
  checkWinner()
  render(square)
}

function checkWinner() {
  if (winner === false) {
    if (
      board[0] + board[1] + board[2] === 3 ||
      board[0] + board[3] + board[6] === 3 ||
      board[0] + board[4] + board[8] === 3 ||
      board[1] + board[4] + board[7] === 3 ||
      board[2] + board[4] + board[6] === 3 ||
      board[2] + board[5] + board[8] === 3 ||
      board[3] + board[4] + board[5] === 3 ||
      board[6] + board[7] + board[8] === 3
    ) {
      playAgain.classList.add('animated', 'jello', 'fast')
      message.textContent = "X'S WIN!"
      message.style.color = 'rgba(223, 254, 215, 0.913)'
      message.classList.add('animated', 'pulse', 'infinite', 'fast')
      winner = true
      xWin++
      x.innerText = xWin
    }
    if (
      board[0] + board[1] + board[2] === -3 ||
      board[0] + board[3] + board[6] === -3 ||
      board[0] + board[4] + board[8] === -3 ||
      board[1] + board[4] + board[7] === -3 ||
      board[2] + board[4] + board[6] === -3 ||
      board[2] + board[5] + board[8] === -3 ||
      board[3] + board[4] + board[5] === -3 ||
      board[6] + board[7] + board[8] === -3
    ) {
      playAgain.classList.add('animated', 'jello', 'fast')
      message.textContent = "O'S WIN!"
      message.style.color = 'rgba(198, 224, 255, 0.913)'
      message.classList.add('animated', 'pulse', 'infinite', 'fast')
      winner = true
      oWin++
      o.innerText = oWin
    }
  }
}

function render(square) {
  if (winner === false) {
    markSpot = document.getElementById(`sq${square}`)
    console.log(markSpot)
    board[square] = player
    if (player === 1) {
      markSpot.textContent = 'X'
      markSpot.style.color = 'rgba(223, 254, 215, 0.913)'
      message.textContent = "O'S GO!"
      message.classList.remove('animated', 'pulse', 'infinite', 'fast')
    } else {
      markSpot.textContent = 'O'
      markSpot.style.color = 'rgba(198, 224, 255, 0.913)'
      message.textContent = "X'S GO!"
    }
  }
  player *= -1
  checkWinner()
  count++
  if (count === 10 && winner === false) {
    playAgain.classList.add('animated', 'jello', 'fast')
    dWin++
    d.innerText = dWin
    message.textContent = 'DRAW!'
    message.style.color = 'rgba(255, 217, 223, 0.913)'
    message.classList.add('animated', 'pulse', 'infinite', 'fast')
  }
  playAgain.style.visibility = gameOver() ? 'visible' : 'hidden'
}
