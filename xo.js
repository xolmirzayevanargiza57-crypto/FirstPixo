const AudioCtx = window.AudioContext || window.webkitAudioContext;
let actx;
function getCtx() { if (!actx) actx = new AudioCtx(); return actx; }
function playTone(freq, type, dur, vol=0.28, delay=0) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator(), gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime + delay);
    gain.gain.setValueAtTime(vol, ac.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + delay + dur);
    osc.start(ac.currentTime + delay);
    osc.stop(ac.currentTime + delay + dur);
  } catch(e) {}
}
function soundX()    { playTone(660,'sine',0.14,0.25); playTone(880,'sine',0.11,0.15,0.08); }
function soundO()    { playTone(440,'triangle',0.17,0.25); playTone(550,'triangle',0.11,0.18,0.09); }
function soundWin()  { [523,659,784,1047].forEach((f,i)=>playTone(f,'sine',0.28,0.32,i*0.12)); }
function soundDraw() { [300,250,200].forEach((f,i)=>playTone(f,'sawtooth',0.15,0.2,i*0.11)); }

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let scores = { X:0, O:0 };

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const SVG_X = `<svg viewBox="0 0 40 40" fill="none">
  <line x1="7" y1="7" x2="33" y2="33" stroke="#00cfff" stroke-width="5" stroke-linecap="round"/>
  <line x1="33" y1="7" x2="7" y2="33" stroke="#00cfff" stroke-width="5" stroke-linecap="round"/>
</svg>`;
const SVG_O = `<svg viewBox="0 0 40 40" fill="none">
  <circle cx="20" cy="20" r="12" stroke="#ff6b35" stroke-width="5"/>
</svg>`;

function startGame() {
  document.getElementById('indexPage').classList.add('hidden');
  document.getElementById('gamePage').classList.remove('hidden');
  resetBoard();
}
function goHome() {
  document.getElementById('gamePage').classList.add('hidden');
  document.getElementById('indexPage').classList.remove('hidden');
}

function handleClick(idx) {
  if (gameOver || board[idx]) return;
  board[idx] = currentPlayer;
  const cell = document.querySelector(`.cell[data-i="${idx}"]`);
  cell.innerHTML = currentPlayer === 'X' ? SVG_X : SVG_O;
  cell.classList.add('taken');
  if (currentPlayer === 'X') {
    cell.style.boxShadow = '0 0 18px #00cfff55';
    cell.style.borderColor = '#00cfff44';
    soundX();
  } else {
    cell.style.boxShadow = '0 0 18px #ff6b3555';
    cell.style.borderColor = '#ff6b3544';
    soundO();
  }
  requestAnimationFrame(() => cell.classList.add('show'));

  const win = checkWin();
  if (win) {
    scores[currentPlayer]++;
    document.getElementById(`score${currentPlayer}`).textContent = scores[currentPlayer];
    highlightWin(win);
    const nom = currentPlayer === 'X' ? "X O'YINCHI" : "0 O'YINCHI";
    updateStatus(`🏆 ${nom} G'ALABA QOZINDI!`, 'win-msg');
    soundWin();
    gameOver = true;
    return;
  }
  if (board.every(c => c)) {
    updateStatus("DURANG! HECH KIM YUTMADI", 'draw-msg');
    document.getElementById('grid').classList.add('draw');
    soundDraw();
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateTurnUI();
}

function checkWin() {
  for (const [a,b,c] of WIN_COMBOS)
    if (board[a] && board[a]===board[b] && board[a]===board[c]) return [a,b,c];
  return null;
}

function highlightWin(combo) {
  const color = currentPlayer === 'X' ? '#00cfff' : '#ff6b35';
  combo.forEach(i => {
    const cell = document.querySelector(`.cell[data-i="${i}"]`);
    cell.classList.add('win-cell');
    cell.style.boxShadow   = `0 0 28px ${color}, 0 0 60px ${color}88`;
    cell.style.borderColor = color;
  });
  drawWinLine(combo, color);
}

function getCellCenter(idx) {
  const col = idx%3, row = Math.floor(idx/3);
  const size = (380-20)/3;
  return { x: col*(size+10)+size/2, y: row*(size+10)+size/2 };
}

function drawWinLine(combo, color) {
  const p1 = getCellCenter(combo[0]), p2 = getCellCenter(combo[2]);
  const line = document.getElementById('winLine');
  line.setAttribute('x1',p1.x); line.setAttribute('y1',p1.y);
  line.setAttribute('x2',p2.x); line.setAttribute('y2',p2.y);
  line.setAttribute('stroke', color);
  line.style.filter = `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 20px ${color})`;
  line.style.animation = 'none'; line.offsetHeight; line.style.animation = '';
  document.getElementById('winLineSvg').classList.add('visible');
}

function updateTurnUI() {
  if (currentPlayer === 'X') {
    document.getElementById('cardX').classList.add('active-x');
    document.getElementById('cardO').classList.remove('active-o');
    updateStatus("X O'YINCHI — SIZNING NAVBATINGIZ", 'x-turn');
  } else {
    document.getElementById('cardO').classList.add('active-o');
    document.getElementById('cardX').classList.remove('active-x');
    updateStatus("0 O'YINCHI — SIZNING NAVBATINGIZ", 'o-turn');
  }
}

function updateStatus(msg, cls) {
  const bar = document.getElementById('statusBar');
  bar.textContent = msg; bar.className = 'status-bar ' + cls;
}

function resetBoard() {
  board = Array(9).fill(null);
  currentPlayer = 'X'; gameOver = false;
  document.querySelectorAll('.cell').forEach(c => {
    c.innerHTML=''; c.className='cell';
    c.style.boxShadow=''; c.style.borderColor='';
  });
  document.getElementById('grid').classList.remove('draw');
  document.getElementById('winLineSvg').classList.remove('visible');
  document.getElementById('cardX').classList.add('active-x');
  document.getElementById('cardO').classList.remove('active-o');
  updateStatus("X O'YINCHI — SIZNING NAVBATINGIZ", 'x-turn');
}

function restartGame() { resetBoard(); }