// ═══ AUDIO ═══
var audioCtx=null, soundOn=true;
function getAC(){ if(!audioCtx){ try{ audioCtx=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return audioCtx; }
function resumeAC(){ var ac=getAC(); if(ac&&ac.state==='suspended') ac.resume(); }
function tone(freq,dur,type,vol){
  type=type||'square'; vol=vol||0.16;
  if(!soundOn) return;
  var ac=getAC(); if(!ac) return; resumeAC();
  var o=ac.createOscillator(), g=ac.createGain();
  o.connect(g); g.connect(ac.destination);
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(vol,ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+dur);
  o.start(); o.stop(ac.currentTime+dur);
}
function noise(dur,vol){
  vol=vol||0.12; if(!soundOn) return;
  var ac=getAC(); if(!ac) return; resumeAC();
  var buf=ac.createBuffer(1,ac.sampleRate*dur,ac.sampleRate);
  var d=buf.getChannelData(0);
  for(var i=0;i<d.length;i++) d[i]=Math.random()*2-1;
  var src=ac.createBufferSource(); src.buffer=buf;
  var g=ac.createGain(), f=ac.createBiquadFilter();
  f.type='bandpass'; f.frequency.value=280;
  src.connect(f); f.connect(g); g.connect(ac.destination);
  g.gain.setValueAtTime(vol,ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ac.currentTime+dur);
  src.start(); src.stop(ac.currentTime+dur);
}
var SFX={
  punch:    function(){ noise(.07,.22); tone(130,.05,'sawtooth',.14); },
  kick:     function(){ noise(.11,.28); tone(90,.09,'sawtooth',.18); },
  superAtk: function(){ tone(220,.05,'square',.2); setTimeout(function(){tone(440,.08,'square',.16);},50); setTimeout(function(){tone(660,.14,'square',.13);},110); noise(.2,.3); },
  block:    function(){ tone(320,.04,'triangle',.11); noise(.04,.09); },
  jump:     function(){ tone(460,.07,'sine',.09); tone(580,.05,'sine',.07); },
  hurt:     function(){ noise(.14,.28); tone(110,.11,'sawtooth',.18); },
  win:      function(){ [523,659,784,1047].forEach(function(f,i){ setTimeout(function(){tone(f,.16,'square',.14);},i*100); }); },
  lose:     function(){ [523,415,330,262].forEach(function(f,i){ setTimeout(function(){tone(f,.2,'sawtooth',.14);},i*110); }); },
  countdown:function(){ tone(660,.14,'square',.18); },
  fight:    function(){ tone(220,.07,'square',.22); setTimeout(function(){tone(330,.07,'square',.2);},80); setTimeout(function(){tone(440,.18,'square',.18);},160); },
  spCharge: function(){ tone(900,.07,'sine',.11); },
  combo:    function(){ tone(1000+Math.random()*180,.05,'square',.09); }
};

// ═══ STORAGE ═══
var ST={
  g:function(k,d){ try{ var v=localStorage.getItem(k); return v!==null?JSON.parse(v):d; }catch(e){return d;} },
  s:function(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
};

var playerName=ST.g('pname','Pilot');
var stats=ST.g('stats',{rating:1000,wins:0,losses:0,total:0,best:0,streak:0,maxStreak:0});
var difficulty=ST.g('diff','easy');
soundOn=ST.g('sound',true);
function saveAll(){ ST.s('pname',playerName); ST.s('stats',stats); ST.s('diff',difficulty); ST.s('sound',soundOn); }

// ═══ QIYINCHILIK — BOT SUSTLASHTIRILDI ═══
var DIFF={
  easy:   {aiAgg:.20, aiReact:.15, aiCD:32, label:'🟢 OSON',   cls:'db-easy',   mul:1.0},
  medium: {aiAgg:.108, aiReact:.130, aiCD:10, label:'🟡 O\'RTA', cls:'db-medium', mul:5.5},
  hard:   {aiAgg:.308, aiReact:.300, aiCD:10, label:'🔴 QIYIN',  cls:'db-hard',   mul:.0}
};

// Bot zarari multiplieri — pastroq = zaif bot
var BOT_DMG_MUL = {easy: 0.45, medium: 0.70, hard: 0.95};

// ═══ CANVAS ═══
var canvas=document.getElementById('c');
var ctx=canvas.getContext('2d');
var W, H, GY;
function resize(){
  W=canvas.width=canvas.offsetWidth||320;
  H=canvas.height=canvas.offsetHeight||220;
  GY=H*0.78;
}

// ═══ INPUT ═══
var keys={};
document.addEventListener('keydown',function(e){
  keys[e.code]=true;
  if(['Space','ArrowUp','ArrowLeft','ArrowRight','ArrowDown'].includes(e.code)) e.preventDefault();
  if(e.code==='KeyP'||e.code==='Escape') togglePause();
});
document.addEventListener('keyup',function(e){ keys[e.code]=false; });

var BM={
  'cb-left':'ArrowLeft','cb-right':'ArrowRight','cb-up':'ArrowUp',
  'cb-punch':'KeyA','cb-kick':'KeyS','cb-super':'KeyD','cb-block':'KeyF'
};
Object.keys(BM).forEach(function(id){
  var code=BM[id];
  var el=document.getElementById(id); if(!el) return;
  function on(e){ e.preventDefault(); keys[code]=true; el.classList.add('on'); }
  function off(e){ e.preventDefault(); keys[code]=false; el.classList.remove('on'); }
  el.addEventListener('touchstart',on,{passive:false});
  el.addEventListener('touchend',off,{passive:false});
  el.addEventListener('touchcancel',off,{passive:false});
  el.addEventListener('mousedown',on);
  el.addEventListener('mouseup',off);
  el.addEventListener('mouseleave',off);
});

// ═══ GAME VARS ═══
var GRAV=0.48, JUMP=-11.5, SPD=2.6;
var MAX_HP=100, MAX_SP=100;
var P_DMG=7, K_DMG=13, S_DMG=30;
var P_CD=20, K_CD=32, S_CD=60, HIT_STUN=18, BLOCK_R=0.18;
var FW=18, FH=32;

var parts=[], htxts=[];
function spawnP(x,y,col,n,t){
  n=n||7; t=t||'sq';
  for(var i=0;i<n;i++){
    var a=Math.random()*Math.PI*2, s=Math.random()*3.5+1;
    parts.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-2,life:1,col:col,r:Math.random()*3+1.5,t:t});
  }
}
function spawnHT(x,y,txt,col){ htxts.push({x:x,y:y,txt:txt,col:col,life:1,vy:-1.5}); }

// ═══ FIGHTER ═══
function Fighter(isBot){
  this.isBot=isBot;
  this.reset();
}
Fighter.prototype.reset=function(){
  this.w=FW; this.h=FH;
  this.x=this.isBot?W*0.62:W*0.12;
  this.y=GY-FH;
  this.vx=0; this.vy=0; this.onGround=true;
  this.dir=this.isBot?-1:1;
  this.hp=MAX_HP; this.sp=0;
  this.state='idle'; this.stateTimer=0; this.hitStun=0;
  this.pCD=0; this.kCD=0; this.sCD=0;
  this.blocking=false; this.anim=0;
  this.combo=0; this.comboTimer=0; this.aiCD=0; this._prevSP=0;
};
Object.defineProperty(Fighter.prototype,'cx',{get:function(){return this.x+this.w/2;}});
Object.defineProperty(Fighter.prototype,'cy',{get:function(){return this.y+this.h/2;}});
Fighter.prototype.faceEnemy=function(e){ this.dir=e.cx>this.cx?1:-1; };
Fighter.prototype.dist=function(o){ return Math.abs(this.cx-o.cx); };

Fighter.prototype.takeDmg=function(dmg, att, isFromBot){
  if(this.state==='dead') return;
  // Bot hujumiga zarar multiplieri qo'llash
  var actualDmg = dmg;
  if(isFromBot) actualDmg = Math.round(dmg * (BOT_DMG_MUL[difficulty]||0.5));
  var d=(this.blocking&&this.onGround)?Math.floor(actualDmg*BLOCK_R):actualDmg;
  this.hp=Math.max(0,this.hp-d);
  this.hitStun=this.blocking?5:HIT_STUN;
  if(!this.blocking){ this.state='hurt'; this.stateTimer=HIT_STUN; this.vx=-this.dir*2.5; }
  att.sp=Math.min(MAX_SP,att.sp+dmg*0.8);
  this.sp=Math.min(MAX_SP,this.sp+dmg*0.2);
  spawnP(this.cx,this.cy,this.isBot?'#ff4d6d':'#00e5ff',8,'sq');
  if(this.blocking) SFX.block(); else SFX.hurt();
  bars();
  if(this.hp<=0) this.die();
};
Fighter.prototype.die=function(){
  this.state='dead';
  spawnP(this.cx,this.cy,this.isBot?'#ff4d6d':'#00e5ff',20,'sq');
  endRound(this.isBot?'player':'bot');
};
Fighter.prototype.attack=function(type,enemy,fromBot){
  if(this.hitStun>0) return;
  if(type==='punch'&&this.pCD>0) return;
  if(type==='kick' &&this.kCD>0) return;
  if(type==='super'&&(this.sCD>0||this.sp<MAX_SP)) return;
  var range=type==='super'?110:type==='kick'?80:60;
  var hit=this.dist(enemy)<range;
  if(hit){
    var dmg=type==='punch'?P_DMG:type==='kick'?K_DMG:S_DMG;
    enemy.takeDmg(dmg,this,fromBot);
    this.combo++; this.comboTimer=65;
    if(this.combo>=2) SFX.combo();
    if(type==='super'){ this.sp=0; this.sCD=S_CD; spawnP(this.cx,this.cy,'#f5a623',18,'star'); }
  }
  if(type==='punch'){ this.state='punch'; this.stateTimer=P_CD; this.pCD=P_CD; if(hit) SFX.punch(); }
  if(type==='kick') { this.state='kick';  this.stateTimer=K_CD; this.kCD=K_CD; if(hit) SFX.kick(); }
  if(type==='super'){ this.state='super'; this.stateTimer=S_CD; SFX.superAtk(); }
};

Fighter.prototype.botUpdate=function(enemy){
  if(this.state==='dead') return;
  this.faceEnemy(enemy);
  var cfg=DIFF[difficulty], dist=this.dist(enemy), hpR=this.hp/MAX_HP;
  if(this.aiCD>0){ this.aiCD--; return; }
  this.blocking=false;

  // Blok qilish / qochish — sustlashtirildi
  if((enemy.state==='punch'||enemy.state==='kick'||enemy.state==='super')&&dist<90){
    var r=Math.random();
    if(r<cfg.aiReact*.5){ this.blocking=true; this.aiCD=20; return; }
    if(r<cfg.aiReact)   { this.vx=this.dir*-SPD*1.4; this.aiCD=14; return; }
  }

  // Super hujum — kamroq ishlatadi
  if(this.sp>=MAX_SP&&dist<120&&Math.random()<cfg.aiAgg*.6){ this.attack('super',enemy,true); this.aiCD=50; return; }

  // Yaqin masofada hujum — sekinroq
  if(dist<68){
    var r2=Math.random();
    if(r2<.38)      this.attack('punch',enemy,true);
    else if(r2<.68) this.attack('kick',enemy,true);
    else if(this.onGround){ this.vy=JUMP*.8; this.onGround=false; }
    this.aiCD=cfg.aiCD+Math.floor(Math.random()*12);
    return;
  }

  // O'rta masofada — sekinroq yaqinlashadi
  if(dist<170){
    if(Math.random()<cfg.aiAgg*.7) this.vx=this.dir*SPD*0.85;
    if(Math.random()<.02&&this.onGround){ this.vy=JUMP; this.onGround=false; }
    if(dist<100&&Math.random()<cfg.aiAgg*.25) this.attack('kick',enemy,true);
    return;
  }

  // Uzoq masofada — sekin yuradi
  this.vx=this.dir*SPD*(hpR<.2?.45:.75);
};

Fighter.prototype.update=function(enemy){
  this.anim++;
  if(this.pCD>0) this.pCD--; if(this.kCD>0) this.kCD--; if(this.sCD>0) this.sCD--;
  if(this.stateTimer>0){ this.stateTimer--; if(this.stateTimer===0&&this.state!=='dead') this.state='idle'; }
  if(this.hitStun>0) this.hitStun--;
  if(this.comboTimer>0){ this.comboTimer--; if(this.comboTimer===0) this.combo=0; }
  if(this.isBot) this.botUpdate(enemy);
  this.x+=this.vx; this.vy+=GRAV; this.y+=this.vy; this.vx*=0.76;
  if(this.y+this.h>=GY){ this.y=GY-this.h; this.vy=0; this.onGround=true; if(this.state==='jump') this.state='idle'; }
  this.x=Math.max(2,Math.min(W-this.w-2,this.x));
  if(this.state==='idle'||this.state==='walk') this.state=Math.abs(this.vx)>0.4?'walk':'idle';
  if(this.sp>=MAX_SP&&this._prevSP<MAX_SP) SFX.spCharge();
  this._prevSP=this.sp;
};

// ═══ DRAW ROBOT ═══
function drawRobot(f,mainCol,glowCol,darkCol){
  var x=f.x,y=f.y,w=f.w,h=f.h;
  var dir=f.dir,state=f.state,anim=f.anim,hitStun=f.hitStun,blocking=f.blocking;
  if(hitStun>0&&Math.floor(anim/3)%2===0) return;
  ctx.save();
  ctx.translate(x+w/2,y+h);
  if(dir<0) ctx.scale(-1,1);
  var bob=state==='idle'?Math.sin(anim*.1)*.6:0;
  ctx.translate(0,bob);
  if(state==='super'){ ctx.shadowBlur=12; ctx.shadowColor='#f5a623'; }
  var sc=w/18;
  ctx.scale(sc,sc);
  var TH=h/sc;
  var legH=TH*.30, bodyH=TH*.38, headH=TH*.28;
  var bodyBot=-legH, bodyTop=bodyBot-bodyH;
  var headBot=bodyTop-TH*.04, headTop=headBot-headH;
  var bw=9;
  var walkA=state==='walk'?Math.sin(anim*.3)*18:0;

  // FEET
  ctx.fillStyle=darkCol;
  ctx.save(); ctx.translate(-4,0); ctx.rotate(walkA*Math.PI/180);
  ctx.beginPath(); ctx.roundRect(-4,-2.5,8,2.5,1); ctx.fill(); ctx.restore();
  if(state==='kick'){
    ctx.save(); ctx.translate(4,bodyBot+legH*.4); ctx.rotate(-62*Math.PI/180);
    ctx.shadowBlur=7; ctx.shadowColor=glowCol; ctx.fillStyle=glowCol;
    ctx.beginPath(); ctx.roundRect(-5,-2.5,10,3,1.5); ctx.fill();
    ctx.shadowBlur=0; ctx.restore();
  } else {
    ctx.save(); ctx.translate(4,0); ctx.rotate(-walkA*Math.PI/180);
    ctx.fillStyle=darkCol;
    ctx.beginPath(); ctx.roundRect(-4,-2.5,8,2.5,1); ctx.fill(); ctx.restore();
  }

  // LEGS
  var legW=4;
  ctx.save(); ctx.translate(-4,bodyBot); ctx.rotate(walkA*Math.PI/180);
  ctx.fillStyle=mainCol;
  ctx.beginPath(); ctx.roundRect(-legW/2,0,legW,legH,2); ctx.fill();
  ctx.fillStyle=glowCol; ctx.globalAlpha=.6;
  ctx.beginPath(); ctx.arc(0,0,2,0,Math.PI*2); ctx.fill();
  ctx.globalAlpha=1; ctx.restore();
  if(state==='kick'){
    ctx.save(); ctx.translate(4,bodyBot); ctx.rotate(-52*Math.PI/180);
    ctx.shadowBlur=6; ctx.shadowColor=glowCol; ctx.fillStyle=glowCol;
    ctx.beginPath(); ctx.roundRect(-legW/2-1,0,legW+2,legH*.65,2); ctx.fill();
    ctx.fillStyle=glowCol; ctx.globalAlpha=.8;
    ctx.beginPath(); ctx.arc(0,0,2.2,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1; ctx.shadowBlur=0; ctx.restore();
  } else {
    ctx.save(); ctx.translate(4,bodyBot); ctx.rotate(-walkA*Math.PI/180);
    ctx.fillStyle=mainCol;
    ctx.beginPath(); ctx.roundRect(-legW/2,0,legW,legH,2); ctx.fill();
    ctx.fillStyle=glowCol; ctx.globalAlpha=.6;
    ctx.beginPath(); ctx.arc(0,0,2,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1; ctx.restore();
  }

  // BODY
  ctx.fillStyle=mainCol;
  ctx.beginPath(); ctx.roundRect(-bw,bodyTop,bw*2,bodyH,3); ctx.fill();
  ctx.fillStyle='#050510';
  ctx.beginPath(); ctx.roundRect(-bw*.65,bodyTop+bodyH*.12,bw*1.3,bodyH*.55,2); ctx.fill();
  var ledY=bodyTop+bodyH*.3;
  [[-4,'#00e5ff'],[0,'#4ade80'],[4,'#f5a623']].forEach(function(l){
    ctx.fillStyle=l[1]; ctx.shadowBlur=4; ctx.shadowColor=l[1];
    ctx.beginPath(); ctx.arc(l[0],ledY,1.3,0,Math.PI*2); ctx.fill();
  });
  ctx.shadowBlur=0;
  var cbY=bodyTop+bodyH*.52, cbW=bw*1.1;
  ctx.fillStyle='#0a0a1a';
  ctx.beginPath(); ctx.roundRect(-cbW/2,cbY,cbW,2,1); ctx.fill();
  ctx.fillStyle=glowCol; ctx.globalAlpha=.55;
  ctx.beginPath(); ctx.roundRect(-cbW/2,cbY,cbW*(f.hp/MAX_HP),2,1); ctx.fill();
  ctx.globalAlpha=1;
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.roundRect(-bw,bodyBot-2.5,bw*2,2.5,1); ctx.fill();

  // SHOULDERS
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.arc(-bw,bodyTop+1.5,2.5,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( bw,bodyTop+1.5,2.5,0,Math.PI*2); ctx.fill();

  // ARMS
  var armW=3.2, armH=TH*.24;
  var swA=state==='walk'?Math.sin(anim*.3)*14:0;
  var pX=state==='punch'?7:state==='super'?10:0;
  var pY=state==='punch'?-2.5:state==='super'?-4:0;
  ctx.save(); ctx.translate(-bw,bodyTop+2); ctx.rotate(swA*Math.PI/180);
  ctx.fillStyle=mainCol;
  ctx.beginPath(); ctx.roundRect(-armW/2,0,armW,armH,1.5); ctx.fill();
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.arc(0,armH*.45,1.5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.roundRect(-armW/2-0.5,armH,armW+1,armW,1.5); ctx.fill();
  ctx.restore();
  ctx.save(); ctx.translate(bw,bodyTop+2);
  if(state==='punch'||state==='super'){ ctx.translate(pX,pY); ctx.rotate(-50*Math.PI/180); }
  else { ctx.rotate(-swA*Math.PI/180); }
  ctx.fillStyle=mainCol;
  ctx.beginPath(); ctx.roundRect(-armW/2,0,armW,armH,1.5); ctx.fill();
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.arc(0,armH*.45,1.5,0,Math.PI*2); ctx.fill();
  if(state==='punch'||state==='super'){
    ctx.shadowBlur=8; ctx.shadowColor=glowCol; ctx.fillStyle=glowCol;
    ctx.beginPath(); ctx.roundRect(-armW,armH,armW*2+2,armW+1.5,1.5); ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,.35)'; ctx.lineWidth=.5;
    [-1.5,0.5,2.5].forEach(function(kx){
      ctx.beginPath(); ctx.moveTo(kx,armH); ctx.lineTo(kx,armH+armW+1.5); ctx.stroke();
    });
    ctx.shadowBlur=0;
  } else {
    ctx.fillStyle=darkCol;
    ctx.beginPath(); ctx.roundRect(-armW/2-0.5,armH,armW+1,armW,1.5); ctx.fill();
  }
  ctx.restore();

  // NECK
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.roundRect(-2.5,headBot,5,Math.abs(headBot-bodyTop)+0.5,1); ctx.fill();

  // HEAD
  var hw=8, hh=headH;
  ctx.fillStyle=mainCol;
  ctx.beginPath(); ctx.roundRect(-hw/2,headTop,hw,hh,3); ctx.fill();
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.roundRect(-1.2,headTop-4,2.4,4.5,1); ctx.fill();
  ctx.fillStyle=glowCol; ctx.shadowBlur=5; ctx.shadowColor=glowCol;
  ctx.beginPath(); ctx.arc(0,headTop-4,1.6,0,Math.PI*2); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='#010108';
  ctx.beginPath(); ctx.roundRect(-hw/2+1.2,headTop+hh*.1,hw-2.4,hh*.42,2); ctx.fill();
  var eyeY=headTop+hh*.17, eyeW=2.6, eyeH=2;
  var eyeCol=(state==='punch'||state==='kick'||state==='super')?'#ff3333':glowCol;
  ctx.fillStyle=eyeCol; ctx.shadowBlur=6; ctx.shadowColor=eyeCol;
  ctx.beginPath(); ctx.roundRect(-hw/2+1.8,eyeY,eyeW,eyeH,1); ctx.fill();
  ctx.beginPath(); ctx.roundRect( hw/2-1.8-eyeW,eyeY,eyeW,eyeH,1); ctx.fill();
  ctx.shadowBlur=0;
  ctx.fillStyle='rgba(255,255,255,.4)';
  ctx.beginPath(); ctx.roundRect(-hw/2+2,eyeY+.3,eyeW*.55,.9,.4); ctx.fill();
  ctx.beginPath(); ctx.roundRect( hw/2-1.8-eyeW+.2,eyeY+.3,eyeW*.55,.9,.4); ctx.fill();
  if(state==='punch'||state==='kick'||state==='super'){
    ctx.strokeStyle=glowCol; ctx.lineWidth=.9; ctx.shadowBlur=3; ctx.shadowColor=glowCol;
    ctx.beginPath(); ctx.moveTo(-hw/2+1.5,eyeY-.8); ctx.lineTo(-hw/2+1.5+eyeW+1,eyeY+.2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( hw/2-1.2,eyeY-.8); ctx.lineTo( hw/2-1.2-eyeW-1,eyeY+.2); ctx.stroke();
    ctx.shadowBlur=0;
  }
  var mY=headTop+hh*.62;
  ctx.fillStyle=darkCol;
  ctx.beginPath(); ctx.roundRect(-hw/2+1.5,mY,hw-3,hh*.2,1); ctx.fill();
  ctx.strokeStyle=glowCol; ctx.lineWidth=.5; ctx.globalAlpha=.35;
  for(var mi=0;mi<4;mi++){
    var mx=-hw/2+2.3+mi*1.7;
    ctx.beginPath(); ctx.moveTo(mx,mY); ctx.lineTo(mx,mY+hh*.2); ctx.stroke();
  }
  ctx.globalAlpha=1;
  if(state==='hurt'){
    ctx.fillStyle='#ffe066'; ctx.shadowBlur=5; ctx.shadowColor='#ffe066';
    [[-3,0],[3,-1],[0,-2]].forEach(function(sp){
      ctx.beginPath(); ctx.arc(sp[0],headTop+sp[1],1,0,Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur=0;
  }
  if(blocking){
    ctx.globalAlpha=.32;
    ctx.beginPath(); ctx.arc(hw*.7,(headTop+bodyBot)/2,15,0,Math.PI*2);
    ctx.fillStyle='#ffffff05'; ctx.fill();
    ctx.strokeStyle=glowCol; ctx.lineWidth=1.2; ctx.shadowBlur=6; ctx.shadowColor=glowCol; ctx.stroke();
    ctx.globalAlpha=1; ctx.shadowBlur=0;
  }
  ctx.restore();
}

// ═══ SCENE ═══
var bgOff=0;
function drawScene(){
  var sky=ctx.createLinearGradient(0,0,0,GY);
  sky.addColorStop(0,'#03030d'); sky.addColorStop(1,'#09091e');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  [[.12,.58,'#0e0e20'],[.32,.44,'#0a0a18'],[.57,.52,'#0e0e20'],[.79,.47,'#0a0a18']].forEach(function(m){
    var mx=m[0]*W, my=GY*m[1];
    ctx.beginPath(); ctx.moveTo(mx-W*.18,GY); ctx.lineTo(mx,my); ctx.lineTo(mx+W*.18,GY); ctx.closePath();
    ctx.fillStyle=m[2]; ctx.fill(); ctx.strokeStyle='#ffffff04'; ctx.lineWidth=1; ctx.stroke();
  });
  bgOff=(bgOff+.5)%40;
  ctx.save(); ctx.strokeStyle='#ffffff05'; ctx.lineWidth=1;
  for(var gx=bgOff-40;gx<W+40;gx+=40){ ctx.beginPath(); ctx.moveTo(gx,GY); ctx.lineTo(gx-18,H); ctx.stroke(); }
  for(var gy=GY;gy<H;gy+=20){
    var p=(gy-GY)/(H-GY); ctx.globalAlpha=p*.16;
    ctx.beginPath(); ctx.moveTo(0,gy); ctx.lineTo(W,gy); ctx.stroke();
  }
  ctx.globalAlpha=1; ctx.restore();
  var grd=ctx.createLinearGradient(0,GY,0,H);
  grd.addColorStop(0,'#0f1c32'); grd.addColorStop(1,'#040410');
  ctx.fillStyle=grd; ctx.fillRect(0,GY,W,H-GY);
  ctx.save(); ctx.shadowBlur=10; ctx.shadowColor='#00e5ff18';
  ctx.strokeStyle='#00e5ff22'; ctx.lineWidth=1.2;
  ctx.beginPath(); ctx.moveTo(0,GY); ctx.lineTo(W,GY); ctx.stroke(); ctx.restore();
}

function drawParts(){
  parts=parts.filter(function(p){
    p.x+=p.vx; p.y+=p.vy; p.vy+=.1; p.life-=.026;
    ctx.save(); ctx.globalAlpha=p.life; ctx.fillStyle=p.col; ctx.shadowBlur=4; ctx.shadowColor=p.col;
    if(p.t==='sq'){
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.life*4); ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r); ctx.restore();
    } else if(p.t==='star'){
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.life*3);
      ctx.beginPath();
      for(var i=0;i<5;i++){
        var a=i*Math.PI*2/5-Math.PI/2, b=a+Math.PI/5;
        if(i===0) ctx.moveTo(Math.cos(a)*p.r,Math.sin(a)*p.r); else ctx.lineTo(Math.cos(a)*p.r,Math.sin(a)*p.r);
        ctx.lineTo(Math.cos(b)*p.r*.4,Math.sin(b)*p.r*.4);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    } else {
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    ctx.restore(); return p.life>0;
  });
  var fs=Math.max(10,Math.min(15,W*.034));
  htxts=htxts.filter(function(t){
    t.y+=t.vy; t.life-=.022;
    ctx.save(); ctx.globalAlpha=t.life; ctx.font='bold '+fs+'px Rajdhani';
    ctx.fillStyle=t.col; ctx.shadowBlur=7; ctx.shadowColor=t.col; ctx.textAlign='center';
    ctx.fillText(t.txt,t.x,t.y); ctx.restore(); return t.life>0;
  });
}

// ═══ COUNTDOWN ═══
function startCountdown(cb){
  var el=document.getElementById('countdownTxt'), ov=document.getElementById('countdownOverlay');
  ov.classList.remove('hidden');
  var n=3;
  function tick(){
    el.textContent=n>0?n:'JANG!';
    el.style.animation='none'; void el.offsetWidth; el.style.animation='cdPop .5s ease-out';
    if(n>0) SFX.countdown(); else SFX.fight();
    if(n===0) setTimeout(function(){ ov.classList.add('hidden'); cb(); },700);
    else { n--; setTimeout(tick,900); }
  }
  tick();
}

// ═══ GAME STATE ═══
var p1, bot, running=false, paused=false;
var roundNum=1, p1W=0, botW=0, timer=60, timerInt;

function bars(){
  document.getElementById('h1').style.width=Math.max(0,p1.hp/MAX_HP*100)+'%';
  document.getElementById('h2').style.width=Math.max(0,bot.hp/MAX_HP*100)+'%';
  document.getElementById('s1').style.width=(p1.sp/MAX_SP*100)+'%';
  document.getElementById('s2').style.width=(bot.sp/MAX_SP*100)+'%';
}

function updateMenuUI(){
  document.getElementById('playerNameInput').value=playerName;
  document.getElementById('p1name').textContent=playerName.substring(0,10);
  document.getElementById('mRating').textContent=stats.rating;
  document.getElementById('mWins').textContent=stats.wins;
  document.getElementById('mLoss').textContent=stats.losses;
  document.getElementById('mTotal').textContent=stats.total;
  document.getElementById('mBest').textContent=stats.best||0;
  document.getElementById('mStreak').textContent=stats.streak||0;
  document.getElementById('mMaxStreak').textContent=stats.maxStreak||0;
  updateSoundUI(); updateDiffUI();
}

function updateDiffUI(){
  document.querySelectorAll('.diff-btn').forEach(function(b){
    b.className='diff-btn';
    if(b.dataset.diff===difficulty) b.classList.add('active-'+difficulty);
  });
  var cfg=DIFF[difficulty], badge=document.getElementById('diffBadge');
  badge.textContent=cfg.label; badge.className=cfg.cls; badge.id='diffBadge';
}

function updateSoundUI(){
  var txt=soundOn?'🔊 OVOZ YOQIQ':'🔇 OVOZ O\'CHIQ';
  var sm=document.getElementById('soundToggleMenu');
  sm.textContent=txt; sm.className='sound-toggle'+(soundOn?' on':'');
  var sg=document.getElementById('soundToggleGame');
  if(sg){ sg.textContent=txt; }
}

function startGame(){ roundNum=1; p1W=0; botW=0; startRound(); }

function startRound(){
  resize();
  GY=H*0.78;
  p1=new Fighter(false); bot=new Fighter(true);
  p1.x=W*.1;  p1.y=GY-FH; p1.dir=1;
  bot.x=W*.62; bot.y=GY-FH; bot.dir=-1;
  parts=[]; htxts=[]; bars(); timer=60;
  document.getElementById('tbox').textContent='60';
  document.getElementById('rtxt').textContent='ROUND '+roundNum;
  document.getElementById('p1name').textContent=playerName.substring(0,10);
  document.getElementById('roundOverlay').classList.add('hidden');
  document.getElementById('resultStats').classList.add('hidden');
  document.getElementById('roMenuBtn').classList.add('hidden');
  paused=false; running=false;
  startCountdown(function(){
    clearInterval(timerInt);
    timerInt=setInterval(function(){
      if(!running||paused) return;
      timer--; document.getElementById('tbox').textContent=timer;
      if(timer<=0){ clearInterval(timerInt); timeOut(); }
    },1000);
    running=true;
  });
}

function timeOut(){ running=false; endRound(p1.hp>=bot.hp?'player':'bot'); }

function endRound(winner){
  clearInterval(timerInt); running=false;
  if(winner==='player') p1W++; else botW++;
  if(p1W>=2||botW>=2||roundNum>=3) showResult(p1W>botW);
  else{
    roundNum++;
    showRO(winner==='player'?('🏆 '+playerName+' YUTDI!'):'🤖 BOT YUTDI!','Round '+(roundNum-1)+' tugadi','▶ ROUND '+roundNum,startRound,false);
  }
}

function showResult(pWon){
  stats.total++;
  var mul=DIFF[difficulty].mul, gain=pWon?Math.round(30*mul):-Math.round(20*mul);
  if(pWon){
    stats.wins++; stats.streak=(stats.streak||0)+1;
    if(stats.streak>=(stats.maxStreak||0)) stats.maxStreak=stats.streak;
    var s=stats.rating+gain; if(s>(stats.best||0)) stats.best=s;
  } else { stats.losses++; stats.streak=0; }
  stats.rating=Math.max(0,Math.min(9999,stats.rating+gain));
  saveAll();
  document.getElementById('rsBest').textContent=stats.best||0;
  document.getElementById('rsStreak').textContent=pWon?(stats.streak||0):0;
  document.getElementById('rsRating').textContent=stats.rating;
  document.getElementById('resultStats').classList.remove('hidden');
  document.getElementById('roMenuBtn').classList.remove('hidden');
  if(pWon) SFX.win(); else SFX.lose();
  showRO(
    pWon?('⚙ '+playerName+' G\'OLIB!'):'💀 BOT G\'OLIB!',
    'Sen: '+p1W+' ⚔ Bot: '+botW+' &nbsp;|&nbsp; '+(gain>0?'+'+gain:gain)+' Reyting',
    '↺ QAYTA',startGame,true
  );
}

function showRO(title,sub,btnTxt,cb,showMenu){
  document.getElementById('roTitle').textContent=title;
  document.getElementById('roSub').innerHTML=sub;
  var b=document.getElementById('roBtn'); b.textContent=btnTxt; b.onclick=cb;
  document.getElementById('roMenuBtn').classList.toggle('hidden',!showMenu);
  document.getElementById('roundOverlay').classList.remove('hidden');
}

function goMenu(){
  clearInterval(timerInt); running=false; paused=false;
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('roundOverlay').classList.add('hidden');
  document.getElementById('pauseOverlay').classList.add('hidden');
  document.getElementById('countdownOverlay').classList.add('hidden');
  document.getElementById('menuScreen').classList.remove('hidden');
  updateMenuUI();
}

function togglePause(){
  if(!running) return;
  paused=!paused;
  document.getElementById('pauseOverlay').classList.toggle('hidden',!paused);
  if(paused) SFX.block(); else SFX.countdown();
}

// ── UI events ──
document.getElementById('menuPlayBtn').addEventListener('click',function(){
  resumeAC();
  document.getElementById('menuScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  resize(); startGame();
});
document.getElementById('menuClearBtn').addEventListener('click',function(){
  if(confirm('Reytingni tozalashni tasdiqlaysizmi?')){
    stats={rating:1000,wins:0,losses:0,total:0,best:0,streak:0,maxStreak:0};
    saveAll(); updateMenuUI();
  }
});
document.getElementById('playerNameInput').addEventListener('input',function(){
  playerName=this.value.trim()||'Pilot'; saveAll();
  document.getElementById('p1name').textContent=playerName.substring(0,10);
});
document.querySelectorAll('.diff-btn').forEach(function(b){
  b.addEventListener('click',function(){ difficulty=b.dataset.diff; saveAll(); updateDiffUI(); SFX.punch(); });
});
document.getElementById('soundToggleMenu').addEventListener('click',function(){
  soundOn=!soundOn; saveAll(); updateSoundUI(); if(soundOn) SFX.punch();
});
document.getElementById('soundToggleGame').addEventListener('click',function(){
  soundOn=!soundOn; saveAll(); updateSoundUI(); if(soundOn) SFX.punch();
});
document.getElementById('pauseBtn').addEventListener('click',togglePause);
document.getElementById('resumeBtn').addEventListener('click',togglePause);
document.getElementById('backBtn').addEventListener('click',goMenu);
document.getElementById('quitBtn').addEventListener('click',goMenu);
document.getElementById('roMenuBtn').addEventListener('click',goMenu);
document.getElementById('fsBtn').addEventListener('click',function(){
  resumeAC();
  if(!document.fullscreenElement) document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();
  else document.exitFullscreen&&document.exitFullscreen();
});

// ── Player input ──
var prevA=false, prevS=false, prevD=false;
function handleInput(){
  if(!running||paused||!p1||p1.state==='dead') return;
  p1.faceEnemy(bot);
  var L=keys['ArrowLeft'], R=keys['ArrowRight'], U=keys['ArrowUp'];
  var A=keys['KeyA'], S=keys['KeyS'], D=keys['KeyD'];
  var F=keys['KeyF']||keys['ShiftLeft'];
  p1.blocking=F&&p1.onGround;
  if(p1.hitStun>0||p1.state==='punch'||p1.state==='kick'||p1.state==='super'){
    prevA=A; prevS=S; prevD=D; return;
  }
  if(L) p1.vx=-SPD;
  if(R) p1.vx=SPD;
  if(U&&p1.onGround){ p1.vy=JUMP; p1.onGround=false; p1.state='jump'; spawnP(p1.cx,GY,'#00e5ff18',3,'sq'); SFX.jump(); }
  if(A&&!prevA){ p1.attack('punch',bot,false); if(p1.dist(bot)<60) spawnHT(bot.cx,bot.y,'HIT!','#00e5ff'); }
  if(S&&!prevS){ p1.attack('kick',bot,false);  if(p1.dist(bot)<80) spawnHT(bot.cx,bot.y-5,'KICK!','#f5a623'); }
  if(D&&!prevD&&p1.sp>=MAX_SP){ p1.attack('super',bot,false); if(p1.dist(bot)<110) spawnHT(bot.cx,bot.y-12,'⚡ SUPER!','#ffe066'); }
  prevA=A; prevS=S; prevD=D;
}

// ═══ MAIN LOOP ═══
function loop(){
  var gs=document.getElementById('gameScreen');
  if(!gs.classList.contains('hidden')){
    ctx.clearRect(0,0,W,H);
    drawScene();
    if(running&&!paused&&p1&&bot){ handleInput(); p1.update(bot); bot.update(p1); bars(); }
    if(p1)  drawRobot(p1,  '#0d6e9e','#00e5ff','#062a40');
    if(bot) drawRobot(bot, '#8b1a2e','#ff4d6d','#3a0412');
    drawParts();
    if(paused){ ctx.fillStyle='#00000055'; ctx.fillRect(0,0,W,H); }
    var fs=Math.max(10,Math.min(14,W*.032));
    if(p1&&p1.combo>=2){
      ctx.save(); ctx.font='bold '+fs+'px Rajdhani'; ctx.fillStyle='#00e5ff';
      ctx.shadowBlur=7; ctx.shadowColor='#00e5ff'; ctx.textAlign='left';
      ctx.fillText(p1.combo+'x COMBO!',6,GY-10); ctx.restore();
    }
    if(bot&&bot.combo>=2){
      ctx.save(); ctx.font='bold '+fs+'px Rajdhani'; ctx.fillStyle='#ff4d6d';
      ctx.shadowBlur=7; ctx.shadowColor='#ff4d6d'; ctx.textAlign='right';
      ctx.fillText(bot.combo+'x COMBO!',W-6,GY-10); ctx.restore();
    }
    if(p1&&p1.sp>=MAX_SP&&!paused){
      var fl=Math.sin(Date.now()*.008)*.3+.7;
      ctx.save(); ctx.globalAlpha=fl; ctx.font='bold '+Math.max(8,W*.022)+'px Rajdhani';
      ctx.fillStyle='#f5a623'; ctx.shadowBlur=8; ctx.shadowColor='#f5a623'; ctx.textAlign='left';
      ctx.fillText('⚡ SUPER TAYYOR!',6,GY-24); ctx.restore();
    }
  }
  requestAnimationFrame(loop);
}

// ═══ INIT ═══
resize();
window.addEventListener('resize',function(){ setTimeout(resize,40); });
updateMenuUI();
loop();