/*------Variables (state)------*/
let player
let goFirst = -1
let board
let timeoutID
let time
let count = 0
let xWin = 0
let oWin = 0
let dWin = 0
let winner = false

/*------Cached Element References------*/
const playAgain = document.getElementById('play')
const message = document.getElementById('message')
const counter = document.getElementById('counter')
const x = document.getElementById('Xscore')
const o = document.getElementById('Oscore')
const d = document.getElementById('Dscore')
const timer = document.getElementById('timer')

/*------Event Listeners------*/
document.querySelector('section.board').addEventListener('click', click)
playAgain.addEventListener('click', init)

/*------Functions------*/
init()

function clear() {
  clearTimeout(timeoutID)
  timer.classList.remove(
    'animated',
    'heartBeat',
    'infinite',
    'show-timer',
    'red-timer'
  )
  timer.classList.add('hide-timer')
  timer.innerHTML = time
}

function runTimer() {
  if (count === 9) {
    return
  }
  if (time === 0) {
    timer.innerHTML = "TIME'S UP!"
    setTimeout(() => {
      clear()
      randomClick()
    }, 1000)
  }
  if (winner === false && time > 0) {
    if (time === 5) {
      timer.classList.add('animated', 'heartBeat', 'infinite', 'red-timer')
    }
    timeoutID = setTimeout(() => {
      time--
      timer.innerHTML = time
      runTimer()
    }, 1000)
  }
}

function init() {
  board = ['', '', '', '', '', '', '', '', '']
  goFirst *= -1
  player = goFirst
  x.innerText = xWin
  o.innerText = oWin
  d.innerText = dWin

  if (goFirst === 1) {
    message.textContent = "X'S GO FIRST!"
  } else {
    message.textContent = "O'S GO FIRST!"
  }

  message.classList.add('animated', 'pulse', 'infinite', 'fast')
  message.style.color = 'rgba(255, 254, 234, 0.913)'
  playAgain.style.visibility = 'hidden'
  playAgain.classList.remove('animated', 'jello', 'fast')
  clear()
  x.classList.remove('animated', 'bounce', 'fast')
  o.classList.remove('animated', 'bounce', 'fast')
  d.classList.remove('animated', 'bounce', 'fast')

  document
    .querySelectorAll('section.board')[0]
    .childNodes.forEach((element) => {
      element.textContent = ''
      element.color = ''
    })

  count = 0
  winner = false
}

function gameOver() {
  clear()
  return (count === 9 && winner === false) || winner === true
}

function click(event) {
  clearTimeout(timeoutID)
  let square = parseInt(event.target.id.replace('sq', ''))
  if (board[square] !== '') return
  checkWinner()
  render(square)
  timer.innerHTML = time
  timer.classList.remove('hide-timer')
  timer.classList.add('show-timer')
  if (winner === false) {
    time = 10
    timer.innerHTML = time
    runTimer()
  }
}

function randomClick() {
  clearTimeout(timeoutID)
  let square = Math.floor(Math.random() * 10)
  if (board[square] !== '') {
    randomClick()
  } else {
    checkWinner()
    render(square)
    timer.innerHTML = time
    timer.classList.remove('hide-timer')
    timer.classList.add('show-timer')
    if (winner === false) {
      time = 10
      timer.innerHTML = time
      runTimer()
    }
  }
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
      time = ''
      playAgain.classList.add('animated', 'jello', 'fast')
      message.textContent = "X'S WIN!"
      message.style.color = 'rgba(223, 254, 215, 0.913)'
      message.classList.add('animated', 'pulse', 'infinite', 'fast')
      winner = true
      xWin++
      x.classList.add('animated', 'bounce', 'fast')
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
      time = ''
      playAgain.classList.add('animated', 'jello', 'fast')
      message.textContent = "O'S WIN!"
      message.style.color = 'rgba(198, 224, 255, 0.913)'
      message.classList.add('animated', 'pulse', 'infinite', 'fast')
      winner = true
      oWin++
      o.classList.add('animated', 'bounce', 'fast')
      o.innerText = oWin
    }
  }
}

function render(square) {
  if (winner === false) {
    markSpot = document.getElementById(`sq${square}`)
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
  if (count === 9 && winner === false) {
    playAgain.classList.add('animated', 'jello', 'fast')
    dWin++
    d.classList.add('animated', 'bounce', 'fast')
    d.innerText = dWin
    clear()
    message.textContent = 'DRAW!'
    message.style.color = 'rgba(255, 217, 223, 0.913)'
    message.classList.add('animated', 'pulse', 'infinite', 'fast')
  }
  playAgain.style.visibility = gameOver() ? 'visible' : 'hidden'
}
