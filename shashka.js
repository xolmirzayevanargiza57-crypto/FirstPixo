/* ---- ZARRALAR ---- */
(function(){
  const wrap=document.getElementById('particles');
  const cols=['#00cfff','#ff6600','#ff2244','#00ff99'];
  for(let i=0;i<30;i++){
    const d=document.createElement('div');
    d.className='p';
    const s=1+Math.random()*2.5;
    d.style.cssText=`left:${Math.random()*100}%;width:${s}px;height:${s}px;background:${cols[i%4]};box-shadow:0 0 5px ${cols[i%4]};animation-duration:${8+Math.random()*14}s;animation-delay:${Math.random()*14}s;`;
    wrap.appendChild(d);
  }
})();

/* ---- OVOZ ---- */
let soundOn=true, AC=null;
function ac(){ if(!AC) AC=new(window.AudioContext||window.webkitAudioContext)(); return AC; }

function tone(freq,type,dur,vol,delay){
  if(!soundOn) return;
  try{
    const a=ac(),o=a.createOscillator(),g=a.createGain();
    o.connect(g); g.connect(a.destination);
    o.type=type; o.frequency.value=freq;
    const t=a.currentTime+(delay||0);
    g.gain.setValueAtTime(0,t);
    g.gain.linearRampToValueAtTime(vol,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.start(t); o.stop(t+dur+0.05);
  }catch(e){}
}

const SFX={
  tanlash:  ()=>{ tone(440,'sine',0.08,0.2); tone(660,'sine',0.1,0.15,0.06); },
  yurish:   ()=>{ tone(320,'sine',0.12,0.2); tone(480,'sine',0.08,0.15,0.07); },
  tutish:   ()=>{ tone(200,'sawtooth',0.07,0.25); tone(140,'sawtooth',0.14,0.25,0.07); tone(100,'sine',0.2,0.18,0.14); },
  shoh:     ()=>{ [440,550,660,880].forEach((f,i)=>tone(f,'sine',0.15,0.28,i*0.08)); },
  galaba:   ()=>{ [260,330,390,520,650,780].forEach((f,i)=>tone(f,'sine',0.28,0.35,i*0.1)); },
  xato:     ()=>{ tone(180,'square',0.09,0.18); tone(155,'square',0.09,0.14,0.09); },
  boshlash: ()=>{ tone(440,'sine',0.15,0.25); tone(550,'sine',0.1,0.2,0.1); }
};

/* ---- O'YIN MANTIQ ---- */
let board=[], cur=1, sel=null, valid=[];

function initBoard(){
  board=Array.from({length:8},()=>Array(8).fill(0));
  for(let r=0;r<3;r++) for(let c=0;c<8;c++) if((r+c)%2===1) board[r][c]=2;
  for(let r=5;r<8;r++) for(let c=0;c<8;c++) if((r+c)%2===1) board[r][c]=1;
}

const isQiz  = v=>v===1||v===3;
const isQora = v=>v===2||v===4;
const isShoh = v=>v===3||v===4;
const ozim   = v=>cur===1?isQiz(v):isQora(v);
const raqib  = v=>cur===1?isQora(v):isQiz(v);
const ichida = (r,c)=>r>=0&&r<8&&c>=0&&c<8;

function hamlaFor(r,c,majburiy){
  const v=board[r][c]; if(!v||!ozim(v)) return [];
  const dirs=isShoh(v)?[[-1,-1],[-1,1],[1,-1],[1,1]]:isQiz(v)?[[-1,-1],[-1,1]]:[[1,-1],[1,1]];
  const tutish=[],yurish=[];
  for(const[dr,dc]of dirs){
    const nr=r+dr,nc=c+dc;
    if(!ichida(nr,nc)) continue;
    if(!board[nr][nc]&&!majburiy) yurish.push({tur:'yurish',ga:[nr,nc],dan:[r,c]});
    else if(raqib(board[nr][nc])){
      const jr=nr+dr,jc=nc+dc;
      if(ichida(jr,jc)&&!board[jr][jc]) tutish.push({tur:'tutish',ga:[jr,jc],dan:[r,c],tut:[nr,nc]});
    }
  }
  return tutish.length?tutish:(majburiy?[]:yurish);
}

function barcha(){
  const all=[];
  for(let r=0;r<8;r++) for(let c=0;c<8;c++) if(board[r][c]&&ozim(board[r][c])) all.push(...hamlaFor(r,c,false));
  const tut=all.filter(m=>m.tur==='tutish');
  return tut.length?tut:all;
}

function hujayradan(r,c){
  const a=barcha(),borTutish=a.some(m=>m.tur==='tutish');
  return a.filter(m=>m.dan[0]===r&&m.dan[1]===c&&(!borTutish||m.tur==='tutish'));
}

/* ---- CHIZISH ---- */
function render(){
  const el=document.getElementById('board');
  const cells=el.querySelectorAll('.cell');
  let idx=0;

  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      let cell;
      if(cells[idx]){
        cell=cells[idx];
        cell.className='cell '+((r+c)%2===0?'light':'dark');
        cell.innerHTML='';
      } else {
        cell=document.createElement('div');
        cell.dataset.r=r; cell.dataset.c=c;
        cell.addEventListener('click',function(){ klikQil(+this.dataset.r,+this.dataset.c); });
        el.appendChild(cell);
      }
      cell.className='cell '+((r+c)%2===0?'light':'dark');
      cell.dataset.r=r; cell.dataset.c=c;

      if(sel&&sel[0]===r&&sel[1]===c) cell.classList.add('selected');
      if(valid.some(m=>m.ga[0]===r&&m.ga[1]===c)) cell.classList.add('valid-move');

      const v=board[r][c];
      if(v){
        const p=document.createElement('div');
        p.className='piece '+(isQiz(v)?'red-p':'black-p');
        if(sel&&sel[0]===r&&sel[1]===c) p.classList.add('sel-p');
        if(isShoh(v)){
          const k=document.createElement('div');
          k.className='king-icon'; k.textContent='♛';
          p.appendChild(k);
        }
        cell.appendChild(p);
      }
      idx++;
    }
  }

  while(el.children.length>64) el.removeChild(el.lastChild);

  // Hisoblar
  let qizlar=0,qoralar=0;
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    if(isQiz(board[r][c]))  qizlar++;
    if(isQora(board[r][c])) qoralar++;
  }
  document.getElementById('scoreRed').textContent=qizlar;
  document.getElementById('scoreBlack').textContent=qoralar;

  // Panel holat
  const pR=document.getElementById('panelRed'),  pB=document.getElementById('panelBlack');
  const tR=document.getElementById('turnRed'),    tB=document.getElementById('turnBlack');
  const sb=document.getElementById('statusBar');

  if(cur===1){
    pR.classList.add('active');    pB.classList.remove('active');
    tR.classList.add('show');      tB.classList.remove('show');
    sb.textContent="1-O'YINCHI — YURING";
  } else {
    pB.classList.add('active');    pR.classList.remove('active');
    tB.classList.add('show');      tR.classList.remove('show');
    sb.textContent="2-O'YINCHI — YURING";
  }
}

/* ---- KLIK ---- */
function klikQil(r,c){
  const mv=valid.find(m=>m.ga[0]===r&&m.ga[1]===c);
  if(mv){ bajar(mv); return; }

  const v=board[r][c];
  if(v&&ozim(v)){
    const ms=hujayradan(r,c);
    if(!ms.length){ SFX.xato(); return; }
    sel=[r,c]; valid=ms; SFX.tanlash(); render();
  } else if(sel){
    sel=null; valid=[]; render();
  }
}

/* ---- HAMLA ---- */
function bajar(mv){
  const[fr,fc]=mv.dan,[tr,tc]=mv.ga;
  const dona=board[fr][fc];
  board[tr][tc]=dona; board[fr][fc]=0;

  let tutildi=false, shohlandi=false;
  if(mv.tur==='tutish'){
    board[mv.tut[0]][mv.tut[1]]=0;
    tutildi=true; SFX.tutish();
  } else {
    SFX.yurish();
  }

  if(isQiz(dona)&&tr===0&&!isShoh(dona)){ board[tr][tc]=3; shohlandi=true; SFX.shoh(); }
  if(isQora(dona)&&tr===7&&!isShoh(dona)){ board[tr][tc]=4; shohlandi=true; SFX.shoh(); }

  sel=null; valid=[];

  if(tutildi&&!shohlandi){
    const yana=hamlaFor(tr,tc,true).filter(m=>m.tur==='tutish');
    if(yana.length){ sel=[tr,tc]; valid=yana; render(); return; }
  }

  cur=cur===1?2:1;
  render();
  galabaKo();
}

/* ---- GALABA ---- */
function galabaKo(){
  let qizlar=0,qoralar=0;
  for(let r=0;r<8;r++) for(let c=0;c<8;c++){
    if(isQiz(board[r][c]))  qizlar++;
    if(isQora(board[r][c])) qoralar++;
  }
  const yoqHamla=!barcha().length;
  let galib=null;
  if(qizlar===0)   galib=2;
  else if(qoralar===0) galib=1;
  else if(yoqHamla)    galib=cur===1?2:1;

  if(galib!==null){
    SFX.galaba();
    document.getElementById('winTitle').textContent=`${galib}-O'YINCHI G'OLIB!`;
    document.getElementById('winSub').textContent=`TABRIKLAYMIZ — KIBER CHEMPION`;
    document.getElementById('winOverlay').classList.add('show');
  }
}

/* ---- BOSHQARUV ---- */
function restartGame(){
  initBoard(); cur=1; sel=null; valid=[];
  document.getElementById('winOverlay').classList.remove('show');
  render(); SFX.boshlash();
}

function goHome(){
  window.location.href='game.html';
}

function toggleSound(){
  soundOn=!soundOn;
  const svg=document.getElementById('soundSvg');
  if(soundOn){
    svg.innerHTML=`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
    toastKo('🔊 OVOZ YOQILDI');
    tone(440,'sine',0.1,0.2);
  } else {
    svg.innerHTML=`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="1.6"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="1.6"/>`;
    toastKo('🔇 OVOZ O\'CHIRILDI');
  }
}

function toastKo(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t);
  t._t=setTimeout(()=>t.classList.remove('show'),2200);
}

/* ---- ISHGA TUSHIRISH ---- */
initBoard();
render();