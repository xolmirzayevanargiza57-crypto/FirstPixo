// Stars
(()=>{
  const c=document.getElementById('stars');
  for(let i=0;i<80;i++){
    const s=document.createElement('div');s.className='star';
    const sz=Math.random()*2+.4;
    s.style.cssText=`width:${sz}px;height:${sz}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${Math.random()*5+3}s;animation-delay:${Math.random()*6}s;`;
    c.appendChild(s);
  }
})();

// ═══════════ ENGINE ═══════════
const PC={wK:'♔',wQ:'♕',wR:'♖',wB:'♗',wN:'♘',wP:'♙',bK:'♚',bQ:'♛',bR:'♜',bB:'♝',bN:'♞',bP:'♟'};
const FA=['a','b','c','d','e','f','g','h'];
let GS,stH,mvH,sel,vMvs,over,pPend,p1n,p2n;

const cl=p=>p?p[0]:null;
const tp=p=>p?p[1]:null;
const op=c=>c==='w'?'b':'w';
const inB=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
const dc=o=>JSON.parse(JSON.stringify(o));

function pH(code){
  if(!code)return'';
  return`<span class="piece ${code[0]}">${PC[code]||''}</span>`;
}
function cH(code){
  if(!code)return'';
  const c=code[0];
  const ts=c==='w'?'text-shadow:0 0 2px #000,1px 1px 0 #555;':'';
  return`<span style="color:${c==='w'?'#fff':'#111'};${ts};font-family:'Segoe UI Symbol','Apple Color Emoji',serif;">${PC[code]||''}</span>`;
}

function iBoard(){return[
  ['bR','bN','bB','bQ','bK','bB','bN','bR'],
  ['bP','bP','bP','bP','bP','bP','bP','bP'],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ['wP','wP','wP','wP','wP','wP','wP','wP'],
  ['wR','wN','wB','wQ','wK','wB','wN','wR']
];}

function fSt(){return{
  board:iBoard(),turn:'w',
  castling:{wK:true,wQ:true,bK:true,bQ:true},
  enPassant:null,halfMove:0,fullMove:1,
  capturedByWhite:[],capturedByBlack:[],inCheck:false
};}

function getPseudo(st,r,c){
  const p=st.board[r][c];if(!p)return[];
  const col=cl(p),t=tp(p),mvs=[];
  const push=(tr,tc,ex={})=>{
    if(!inB(tr,tc))return false;
    const tg=st.board[tr][tc];
    if(tg&&cl(tg)===col)return false;
    mvs.push({fr:r,fc:c,tr,tc,...ex});return!tg;
  };
  if(t==='P'){
    const d=col==='w'?-1:1,sr=col==='w'?6:1,pr=col==='w'?0:7;
    if(inB(r+d,c)&&!st.board[r+d][c]){
      mvs.push({fr:r,fc:c,tr:r+d,tc:c,promo:r+d===pr});
      if(r===sr&&!st.board[r+2*d][c])mvs.push({fr:r,fc:c,tr:r+2*d,tc:c,dpp:true});
    }
    for(const dc2 of[-1,1]){
      if(!inB(r+d,c+dc2))continue;
      const tg=st.board[r+d][c+dc2];
      if(tg&&cl(tg)!==col)mvs.push({fr:r,fc:c,tr:r+d,tc:c+dc2,cap:true,promo:r+d===pr});
      if(st.enPassant&&st.enPassant[0]===r+d&&st.enPassant[1]===c+dc2)
        mvs.push({fr:r,fc:c,tr:r+d,tc:c+dc2,ep:true});
    }
    return mvs;
  }
  if(t==='N'){
    for(const[dr,dc2]of[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])push(r+dr,c+dc2);
    return mvs;
  }
  const dirs={B:[[-1,-1],[-1,1],[1,-1],[1,1]],R:[[-1,0],[1,0],[0,-1],[0,1]],
    Q:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]],
    K:[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]};
  if(t==='K'){
    for(const[dr,dc2]of dirs.K)push(r+dr,c+dc2);
    if(!st.inCheck){
      if(st.castling[col+'K']&&!st.board[r][5]&&!st.board[r][6])
        mvs.push({fr:r,fc:c,tr:r,tc:6,castle:'K'});
      if(st.castling[col+'Q']&&!st.board[r][1]&&!st.board[r][2]&&!st.board[r][3])
        mvs.push({fr:r,fc:c,tr:r,tc:2,castle:'Q'});
    }
    return mvs;
  }
  for(const[dr,dc2]of dirs[t]){
    let nr=r+dr,nc=c+dc2;
    while(inB(nr,nc)){if(!push(nr,nc))break;nr+=dr;nc+=dc2;}
  }
  return mvs;
}

function applyMv(st,mv,pt){
  pt=pt||'Q';
  const ns=dc(st),p=ns.board[mv.fr][mv.fc],col=cl(p);
  ns.enPassant=null;
  if(mv.ep){
    const cr=mv.tr+(col==='w'?1:-1),c2=ns.board[cr][mv.tc];
    if(col==='w')ns.capturedByWhite.push(c2);else ns.capturedByBlack.push(c2);
    ns.board[cr][mv.tc]=null;
  }else if(ns.board[mv.tr][mv.tc]){
    if(col==='w')ns.capturedByWhite.push(ns.board[mv.tr][mv.tc]);
    else ns.capturedByBlack.push(ns.board[mv.tr][mv.tc]);
  }
  if(tp(p)==='P')ns.halfMove=0;else ns.halfMove++;
  ns.board[mv.tr][mv.tc]=mv.promo?(col+pt):p;
  ns.board[mv.fr][mv.fc]=null;
  if(mv.dpp)ns.enPassant=[mv.tr,mv.tc];
  if(mv.castle){
    const row=mv.fr;
    if(mv.castle==='K'){ns.board[row][5]=ns.board[row][7];ns.board[row][7]=null;}
    else{ns.board[row][3]=ns.board[row][0];ns.board[row][0]=null;}
  }
  if(tp(p)==='K'){ns.castling[col+'K']=false;ns.castling[col+'Q']=false;}
  if(tp(p)==='R'){
    if(mv.fc===7)ns.castling[col+'K']=false;
    if(mv.fc===0)ns.castling[col+'Q']=false;
  }
  ns.turn=op(col);
  if(col==='b')ns.fullMove++;
  ns.inCheck=isChk(ns,ns.turn);
  return ns;
}

function fK(board,col){
  for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(board[r][c]===col+'K')return[r,c];
  return null;
}
function atk(board,r,c,by){
  const d=by==='w'?1:-1;
  for(const dc2 of[-1,1]){const nr=r+d,nc=c+dc2;if(inB(nr,nc)&&board[nr][nc]===by+'P')return true;}
  for(const[dr,dc2]of[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]){
    const nr=r+dr,nc=c+dc2;if(inB(nr,nc)&&board[nr][nc]===by+'N')return true;}
  for(const[dr,dc2]of[[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]){
    const nr=r+dr,nc=c+dc2;if(inB(nr,nc)&&board[nr][nc]===by+'K')return true;}
  for(const[dr,dc2]of[[-1,0],[1,0],[0,-1],[0,1]]){
    let nr=r+dr,nc=c+dc2;
    while(inB(nr,nc)){const p=board[nr][nc];if(p){if(cl(p)===by&&(tp(p)==='R'||tp(p)==='Q'))return true;break;}nr+=dr;nc+=dc2;}}
  for(const[dr,dc2]of[[-1,-1],[-1,1],[1,-1],[1,1]]){
    let nr=r+dr,nc=c+dc2;
    while(inB(nr,nc)){const p=board[nr][nc];if(p){if(cl(p)===by&&(tp(p)==='B'||tp(p)==='Q'))return true;break;}nr+=dr;nc+=dc2;}}
  return false;
}
function isChk(st,col){const k=fK(st.board,col);return k?atk(st.board,k[0],k[1],op(col)):false;}
function legal(st,r,c){
  const ps=getPseudo(st,r,c),col=cl(st.board[r][c]);
  return ps.filter(mv=>{
    if(mv.castle){
      const cols=mv.castle==='K'?[5,6]:[2,3];
      for(const col2 of cols)if(atk(st.board,mv.fr,col2,op(col)))return false;
    }
    const ns=applyMv(st,mv);
    const k=fK(ns.board,col);
    return k&&!atk(ns.board,k[0],k[1],op(col));
  });
}
function allL(st,col){
  const a=[];
  for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(cl(st.board[r][c])===col)a.push(...legal(st,r,c));
  return a;
}
function toNote(mv,st){
  const t=tp(st.board[mv.fr][mv.fc]);
  if(mv.castle)return mv.castle==='K'?'O-O':'O-O-O';
  let n='';if(t!=='P')n+=t;
  const cap=st.board[mv.tr][mv.tc]||mv.ep;
  if(cap){if(t==='P')n+=FA[mv.fc];n+='x';}
  n+=FA[mv.tc]+(8-mv.tr);
  if(mv.promo)n+='='+(mv.promoTo||'Q');
  return n;
}

// ═══════════ UI ═══════════
function startGame(){
  p1n=document.getElementById('p1In').value.trim()||"Oq o'yinchi";
  p2n=document.getElementById('p2In').value.trim()||"Qora o'yinchi";
  document.getElementById('wNameEl').textContent=p1n;
  document.getElementById('bNameEl').textContent=p2n;
  const h=document.getElementById('homeScreen');
  h.classList.add('out');
  setTimeout(()=>{
    h.style.display='none';h.classList.remove('out');
    document.getElementById('gameScreen').classList.add('show');
    initGame();
  },370);
}

function initGame(){
  GS=fSt();stH=[];mvH=[];sel=null;vMvs=[];over=false;pPend=null;
  buildBoard();render();updateUI();
}
function doNew(){
  closeCf();
  document.getElementById('goModal').classList.remove('show');
  initGame();
}
function confirmNew(){
  if(over||!stH.length){doNew();return;}
  document.getElementById('cfModal').classList.add('show');
}
function closeCf(){document.getElementById('cfModal').classList.remove('show');}
function goHome(){
  document.getElementById('goModal').classList.remove('show');
  document.getElementById('cfModal').classList.remove('show');
  document.getElementById('gameScreen').classList.remove('show');
  document.getElementById('homeScreen').style.display='flex';
}

function buildBoard(){
  // Board size = min of viewport width - margins, capped
  const vw=window.innerWidth;
  // Each square: board fills width-col, capped at 66px
  const boardEl=document.getElementById('board');
  // We'll let CSS handle sizing via aspect-ratio + grid

  const FA2=['a','b','c','d','e','f','g','h'];
  ['cTop','cBot'].forEach(id=>{
    const el=document.getElementById(id);el.innerHTML='';
    const pad=document.createElement('div');pad.style.width='18px';el.appendChild(pad);
    for(let c=0;c<8;c++){const d=document.createElement('div');d.className='crd';d.textContent=FA2[c];el.appendChild(d);}
    const p2=document.createElement('div');p2.style.width='18px';el.appendChild(p2);
  });

  // Rank labels height = square size
  // We measure after board renders, but set a reasonable default
  ['rkL','rkR'].forEach(id=>{
    const el=document.getElementById(id);el.innerHTML='';
    for(let r=0;r<8;r++){
      const d=document.createElement('div');d.className='rk';
      d.textContent=8-r;el.appendChild(d);
    }
  });

  const b=document.getElementById('board');b.innerHTML='';
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const sq=document.createElement('div');
    sq.className='sq '+((r+c)%2===0?'light':'dark');
    sq.id=`sq${r}${c}`;
    sq.addEventListener('click',()=>onClick(r,c));
    b.appendChild(sq);
  }

  // Set square sizes after board is in DOM
  requestAnimationFrame(()=>setSqSize());
}

function setSqSize(){
  const boardWrap=document.querySelector('.board-wrap');
  if(!boardWrap)return;
  const avail=boardWrap.offsetWidth-44; // minus rank labels
  const sqS=Math.min(Math.floor(avail/8),66);
  const b=document.getElementById('board');
  b.style.gridTemplateColumns=`repeat(8,${sqS}px)`;
  const sqs=b.querySelectorAll('.sq');
  sqs.forEach(sq=>{sq.style.width=sqS+'px';sq.style.height=sqS+'px';});
  // Set rank heights
  ['rkL','rkR'].forEach(id=>{
    const el=document.getElementById(id);
    el.querySelectorAll('.rk').forEach(rk=>{rk.style.height=sqS+'px';});
  });
  // Piece font size
  const pSize=Math.min(sqS*0.72,42);
  b.querySelectorAll('.piece').forEach(p=>{p.style.fontSize=pSize+'px';});
}

function render(){
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const sq=document.getElementById(`sq${r}${c}`);if(!sq)continue;
    sq.className='sq '+((r+c)%2===0?'light':'dark');
    sq.innerHTML=pH(GS.board[r][c]);
  }
  if(stH.length){
    const lm=stH[stH.length-1].mv;
    if(lm){
      document.getElementById(`sq${lm.fr}${lm.fc}`)?.classList.add('last-from');
      document.getElementById(`sq${lm.tr}${lm.tc}`)?.classList.add('last-to');
    }
  }
  if(sel){
    const[r,c]=sel;
    document.getElementById(`sq${r}${c}`)?.classList.add('selected');
    for(const mv of vMvs){
      const el=document.getElementById(`sq${mv.tr}${mv.tc}`);
      if(el)el.classList.add(GS.board[mv.tr][mv.tc]||mv.ep?'valid-capture':'valid-move');
    }
  }
  if(GS.inCheck){
    const k=fK(GS.board,GS.turn);
    if(k)document.getElementById(`sq${k[0]}${k[1]}`)?.classList.add('check-sq');
  }
  // Re-apply font sizes after render
  requestAnimationFrame(()=>setSqSize());
}

function onClick(r,c){
  if(over||pPend)return;
  const p=GS.board[r][c];
  if(sel){
    const mv=vMvs.find(m=>m.tr===r&&m.tc===c);
    if(mv){if(mv.promo){showPromo(mv);return;}doMove(mv);return;}
    if(p&&cl(p)===GS.turn){sel=[r,c];vMvs=legal(GS,r,c);render();return;}
    sel=null;vMvs=[];render();return;
  }
  if(p&&cl(p)===GS.turn){sel=[r,c];vMvs=legal(GS,r,c);render();}
}

function doMove(mv,pt){
  pt=pt||'Q';
  const note=toNote(mv,GS);
  if(mv.promo)mv.promoTo=pt;
  stH.push({state:dc(GS),mv:dc(mv)});
  GS=applyMv(GS,mv,pt);
  sel=null;vMvs=[];
  const ply=stH.length;
  if(ply%2===1)mvH.push({w:note,b:null});
  else if(mvH.length)mvH[mvH.length-1].b=note;
  render();updateUI();checkEnd();
}

function showPromo(mv){
  pPend=mv;
  const col=cl(GS.board[mv.fr][mv.fc]);
  const g=document.getElementById('promoGrid');g.innerHTML='';
  for(const t of['Q','R','B','N']){
    const code=col+t;
    const btn=document.createElement('div');btn.className='promo-p';
    const ts=col==='w'?'text-shadow:0 0 2px #000,1px 1px 0 #555;':'';
    btn.innerHTML=`<span style="color:${col==='w'?'#fff':'#0d0d08'};font-size:2.1rem;font-family:'Segoe UI Symbol','Apple Color Emoji',serif;${ts}">${PC[code]||''}</span>`;
    btn.onclick=()=>{
      document.getElementById('promoModal').classList.remove('show');
      doMove(pPend,t);pPend=null;
    };
    g.appendChild(btn);
  }
  document.getElementById('promoModal').classList.add('show');
}

function undoMove(){
  if(!stH.length||pPend)return;
  GS=stH.pop().state;
  if(mvH.length){const l=mvH[mvH.length-1];if(l.b)l.b=null;else mvH.pop();}
  over=false;sel=null;vMvs=[];
  render();updateUI();
}

function checkEnd(){
  const mvs=allL(GS,GS.turn);
  if(!mvs.length){
    over=true;
    const loser=GS.turn,winner=op(loser);
    const wn=winner==='w'?p1n:p2n,ln=loser==='w'?p1n:p2n;
    if(GS.inCheck){
      showGO('♛','Shoh Mat!',`🏆 ${wn} g'alaba qildi!\n${ln} yutqazdi.`,'var(--gold2)');
    }else{
      showGO('🤝','Pat — Durang',`${ln} yurishsiz qoldi.\nO\'yin durang!`,'var(--neon2)');
    }
    return;
  }
  if(GS.halfMove>=100){
    over=true;
    showGO('🤝','Durang','50 yurish qoidasi bo\'yicha durang.','var(--neon2)');
    return;
  }
  let ps=[];
  for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(GS.board[r][c])ps.push(GS.board[r][c]);
  if(ps.length===2){over=true;showGO('🤝','Durang','Yetarli material yo\'q.','var(--neon2)');}
}

function showGO(icon,title,sub,color){
  document.getElementById('goIcon').textContent=icon;
  document.getElementById('goTitle').textContent=title;
  document.getElementById('goTitle').style.color=color;
  document.getElementById('goSub').textContent=sub;
  document.getElementById('goModal').classList.add('show');
}

function updateUI(){
  const isW=GS.turn==='w';
  document.getElementById('wStrip').classList.toggle('active',isW);
  document.getElementById('bStrip').classList.toggle('active',!isW);
  const curName=isW?p1n:p2n;
  const sEl=document.getElementById('statusMsg');
  sEl.classList.toggle('check',GS.inCheck);
  sEl.textContent=GS.inCheck?`⚠ ${curName} — SHOH!`:`${isW?'♙':'♟'} ${curName} navbatda`;
  document.getElementById('capWhite').innerHTML=GS.capturedByWhite.map(p=>cH(p)).join('');
  document.getElementById('capBlack').innerHTML=GS.capturedByBlack.map(p=>cH(p)).join('');
  const ml=document.getElementById('moveList');ml.innerHTML='';
  mvH.forEach((pair,i)=>{
    const div=document.createElement('div');div.className='mrow';
    div.innerHTML=`<span class="mn">${i+1}.</span><span class="mw">${pair.w||''}</span><span class="mb">${pair.b||''}</span>`;
    ml.appendChild(div);
  });
  ml.scrollTop=ml.scrollHeight;
}

// Enter key
document.getElementById('p1In').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('p2In').focus();});
document.getElementById('p2In').addEventListener('keydown',e=>{if(e.key==='Enter')startGame();});

// Resize
window.addEventListener('resize',()=>{if(document.getElementById('gameScreen').classList.contains('show'))setSqSize();});

// Init
document.getElementById('homeScreen').style.display='flex';
document.getElementById('gameScreen').classList.remove('show');