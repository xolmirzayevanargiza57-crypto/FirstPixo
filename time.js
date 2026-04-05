// ══════════════════════════════════════════
//  SVG BACKGROUNDS — 100% OFFLINE, NO CDN
// ══════════════════════════════════════════
function makeSVG(content, w=800, h=600){
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${content}</svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

const SVGS = {
  tabiat: makeSVG(`
    <defs>
      <linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#87CEEB'/><stop offset='55%' stop-color='#c8e8a0'/><stop offset='100%' stop-color='#3a7d44'/>
      </linearGradient>
      <radialGradient id='sun' cx='75%' cy='22%' r='12%'>
        <stop offset='0%' stop-color='#FFE87C' stop-opacity='1'/><stop offset='100%' stop-color='#FFE87C' stop-opacity='0'/>
      </radialGradient>
      <linearGradient id='grass' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#4a9c5d'/><stop offset='100%' stop-color='#2d6a3f'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#sky)'/>
    <circle cx='600' cy='130' r='55' fill='#FFE87C' opacity='.9'/>
    <circle cx='600' cy='130' r='80' fill='url(#sun)'/>
    <ellipse cx='150' cy='110' rx='70' ry='35' fill='white' opacity='.7'/>
    <ellipse cx='200' cy='95' rx='55' ry='30' fill='white' opacity='.8'/>
    <ellipse cx='480' cy='80' rx='80' ry='38' fill='white' opacity='.6'/>
    <ellipse cx='540' cy='68' rx='60' ry='28' fill='white' opacity='.7'/>
    <rect x='0' y='370' width='800' height='230' fill='url(#grass)'/>
    <ellipse cx='400' cy='370' rx='800' ry='40' fill='#3a8c50'/>
    <!-- Trees -->
    <rect x='95' y='280' width='18' height='100' fill='#5c3d1e'/>
    <polygon points='104,160 55,310 153,310' fill='#2d6a3f'/>
    <polygon points='104,210 62,320 146,320' fill='#3a7d44'/>
    <rect x='680' y='260' width='20' height='120' fill='#5c3d1e'/>
    <polygon points='690,130 638,290 742,290' fill='#2d6a3f'/>
    <polygon points='690,185 645,300 735,300' fill='#3a7d44'/>
    <rect x='560' y='300' width='14' height='90' fill='#5c3d1e'/>
    <polygon points='567,200 528,320 606,320' fill='#336644'/>
    <rect x='200' y='310' width='12' height='70' fill='#5c3d1e'/>
    <polygon points='206,220 172,325 240,325' fill='#2d6a3f'/>
    <!-- Flowers -->
    <circle cx='320' cy='372' r='5' fill='#FFD700'/>
    <circle cx='450' cy='375' r='4' fill='#FF69B4'/>
    <circle cx='510' cy='370' r='5' fill='#FF69B4'/>
    <circle cx='370' cy='374' r='4' fill='#ffffff'/>
    <!-- Mountains bg -->
    <polygon points='0,370 120,180 240,370' fill='#5a8c6a' opacity='.5'/>
    <polygon points='180,370 340,150 500,370' fill='#4a7c5a' opacity='.4'/>
    <polygon points='400,370 580,170 760,370' fill='#3a6c4a' opacity='.35'/>
  `),

  yomgir: makeSVG(`
    <defs>
      <linearGradient id='stormsky' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#1a2a3a'/><stop offset='60%' stop-color='#2c3e55'/><stop offset='100%' stop-color='#1a252f'/>
      </linearGradient>
      <linearGradient id='ground' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#1a2a1a'/><stop offset='100%' stop-color='#0d1a0d'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#stormsky)'/>
    <!-- Storm clouds -->
    <ellipse cx='200' cy='80' rx='140' ry='60' fill='#2c3e50' opacity='.95'/>
    <ellipse cx='280' cy='55' rx='110' ry='55' fill='#34495e' opacity='.9'/>
    <ellipse cx='150' cy='65' rx='100' ry='45' fill='#2c3e50' opacity='.85'/>
    <ellipse cx='520' cy='70' rx='150' ry='65' fill='#2c3e50' opacity='.95'/>
    <ellipse cx='610' cy='48' rx='120' ry='52' fill='#34495e' opacity='.9'/>
    <ellipse cx='460' cy='58' rx='100' ry='48' fill='#2c3e50' opacity='.85'/>
    <ellipse cx='750' cy='90' rx='100' ry='50' fill='#2c3e50' opacity='.8'/>
    <!-- Lightning -->
    <polyline points='340,60 325,130 345,130 310,220' stroke='#FFE87C' stroke-width='2.5' fill='none' opacity='.6'/>
    <!-- Ground/city silhouette -->
    <rect x='0' y='420' width='800' height='180' fill='url(#ground)'/>
    <rect x='40' y='320' width='60' height='110' fill='#0d1a2a'/>
    <rect x='110' y='280' width='45' height='150' fill='#0a1520'/>
    <rect x='165' y='350' width='70' height='80' fill='#0d1a2a'/>
    <rect x='600' y='300' width='55' height='130' fill='#0a1520'/>
    <rect x='665' y='340' width='80' height='90' fill='#0d1a2a'/>
    <rect x='755' y='310' width='45' height='120' fill='#0a1520'/>
    <!-- Windows lights -->
    <rect x='55' y='335' width='8' height='8' fill='#FFE87C' opacity='.7'/>
    <rect x='75' y='335' width='8' height='8' fill='#FFE87C' opacity='.5'/>
    <rect x='55' y='355' width='8' height='8' fill='#FFE87C' opacity='.6'/>
    <rect x='120' y='295' width='8' height='8' fill='#FFE87C' opacity='.8'/>
    <rect x='140' y='295' width='8' height='8' fill='#FFE87C' opacity='.4'/>
    <rect x='615' y='315' width='8' height='8' fill='#FFE87C' opacity='.7'/>
    <rect x='635' y='315' width='8' height='8' fill='#FFE87C' opacity='.5'/>
    <!-- Puddle reflection -->
    <ellipse cx='400' cy='500' rx='200' ry='18' fill='#2c3e55' opacity='.4'/>
    <ellipse cx='400' cy='500' rx='150' ry='12' fill='#3a5068' opacity='.3'/>
  `),

  ormon: makeSVG(`
    <defs>
      <linearGradient id='forestsky' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#0a1a0a'/><stop offset='100%' stop-color='#1a3020'/>
      </linearGradient>
      <radialGradient id='moonGlow' cx='70%' cy='15%' r='20%'>
        <stop offset='0%' stop-color='#e8f4d0' stop-opacity='.8'/><stop offset='100%' stop-color='#e8f4d0' stop-opacity='0'/>
      </radialGradient>
      <linearGradient id='forestFloor' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#1a3020'/><stop offset='100%' stop-color='#0a1a0a'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#forestsky)'/>
    <!-- Moon -->
    <circle cx='560' cy='90' r='38' fill='#e8f4d0' opacity='.9'/>
    <circle cx='572' cy='82' r='38' fill='#1a3020' opacity='.85'/>
    <circle cx='560' cy='90' r='55' fill='url(#moonGlow)'/>
    <!-- Stars -->
    <circle cx='80' cy='40' r='1.5' fill='white' opacity='.9'/>
    <circle cx='160' cy='25' r='1' fill='white' opacity='.8'/>
    <circle cx='250' cy='55' r='1.5' fill='white' opacity='.7'/>
    <circle cx='350' cy='20' r='1' fill='white' opacity='.9'/>
    <circle cx='440' cy='45' r='1.5' fill='white' opacity='.6'/>
    <circle cx='640' cy='30' r='1' fill='white' opacity='.8'/>
    <circle cx='720' cy='55' r='1.5' fill='white' opacity='.7'/>
    <circle cx='780' cy='25' r='1' fill='white' opacity='.9'/>
    <circle cx='120' cy='70' r='1' fill='white' opacity='.6'/>
    <circle cx='700' cy='80' r='1' fill='white' opacity='.7'/>
    <!-- Dense forest back -->
    <rect x='0' y='300' width='800' height='300' fill='#0d2010'/>
    <!-- Tree row back -->
    <polygon points='0,300 40,140 80,300' fill='#0d2515'/>
    <polygon points='50,300 100,120 150,300' fill='#112a18'/>
    <polygon points='120,300 175,100 230,300' fill='#0d2010'/>
    <polygon points='200,300 260,130 320,300' fill='#112a18'/>
    <polygon points='290,300 350,110 410,300' fill='#0d2515'/>
    <polygon points='370,300 430,90 490,300' fill='#0d2010'/>
    <polygon points='450,300 510,120 570,300' fill='#112a18'/>
    <polygon points='520,300 585,100 650,300' fill='#0d2515'/>
    <polygon points='610,300 670,130 730,300' fill='#0d2010'/>
    <polygon points='690,300 745,110 800,300' fill='#112a18'/>
    <!-- Tree row front -->
    <rect x='20' y='350' width='22' height='160' fill='#060e08'/>
    <polygon points='31,170 -10,370 72,370' fill='#163020'/>
    <polygon points='31,230 -5,375 67,375' fill='#1a3a25'/>
    <rect x='180' y='340' width='24' height='170' fill='#060e08'/>
    <polygon points='192,155 148,360 236,360' fill='#163020'/>
    <polygon points='192,215 152,368 232,368' fill='#1a3a25'/>
    <rect x='380' y='330' width='26' height='180' fill='#060e08'/>
    <polygon points='393,140 345,355 441,355' fill='#163020'/>
    <polygon points='393,205 350,362 436,362' fill='#1a3a25'/>
    <rect x='600' y='345' width='22' height='165' fill='#060e08'/>
    <polygon points='611,160 568,365 654,365' fill='#163020'/>
    <polygon points='611,225 572,372 650,372' fill='#1a3a25'/>
    <rect x='730' y='355' width='20' height='155' fill='#060e08'/>
    <polygon points='740,175 700,370 780,370' fill='#163020'/>
    <!-- Ground fog -->
    <ellipse cx='400' cy='500' rx='500' ry='60' fill='#c8e8c0' opacity='.07'/>
    <ellipse cx='400' cy='520' rx='450' ry='45' fill='#c8e8c0' opacity='.05'/>
  `),

  toglar: makeSVG(`
    <defs>
      <linearGradient id='alpsky' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#0d1b2a'/><stop offset='45%' stop-color='#1a3a5c'/><stop offset='100%' stop-color='#c8d8e8'/>
      </linearGradient>
      <linearGradient id='snow' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#f0f4f8'/><stop offset='100%' stop-color='#c8d8e8'/>
      </linearGradient>
      <linearGradient id='mtn' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#4a5568'/><stop offset='100%' stop-color='#2d3748'/>
      </linearGradient>
      <linearGradient id='valley' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#2d4a2d'/><stop offset='100%' stop-color='#1a2d1a'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#alpsky)'/>
    <!-- Stars -->
    <circle cx='100' cy='50' r='1.5' fill='white' opacity='.8'/>
    <circle cx='200' cy='30' r='1' fill='white' opacity='.9'/>
    <circle cx='320' cy='60' r='1.5' fill='white' opacity='.7'/>
    <circle cx='500' cy='25' r='1' fill='white' opacity='.8'/>
    <circle cx='650' cy='45' r='1.5' fill='white' opacity='.6'/>
    <circle cx='750' cy='20' r='1' fill='white' opacity='.9'/>
    <!-- Aurora hint -->
    <ellipse cx='400' cy='100' rx='500' ry='80' fill='#00ff88' opacity='.04'/>
    <ellipse cx='350' cy='130' rx='400' ry='60' fill='#0088ff' opacity='.04'/>
    <!-- Far mountains -->
    <polygon points='-20,420 130,200 280,420' fill='#2d3748' opacity='.7'/>
    <polygon points='100,420 290,160 480,420' fill='#3a4a5c' opacity='.8'/>
    <polygon points='300,420 500,140 700,420' fill='#2d3748' opacity='.75'/>
    <polygon points='500,420 680,180 860,420' fill='#3a4a5c' opacity='.7'/>
    <!-- Snow caps -->
    <polygon points='130,200 155,255 105,255' fill='url(#snow)'/>
    <polygon points='290,160 325,230 255,230' fill='url(#snow)'/>
    <polygon points='500,140 545,220 455,220' fill='url(#snow)'/>
    <polygon points='680,180 715,248 645,248' fill='url(#snow)'/>
    <!-- Main mountain -->
    <polygon points='0,600 400,100 800,600' fill='url(#mtn)'/>
    <polygon points='250,600 400,100 550,600' fill='#3d4f63'/>
    <!-- Main snow cap -->
    <polygon points='400,100 460,250 340,250' fill='url(#snow)'/>
    <polygon points='400,100 430,185 370,185' fill='white' opacity='.9'/>
    <!-- Valley -->
    <ellipse cx='400' cy='600' rx='500' ry='120' fill='url(#valley)'/>
    <!-- Pine trees silhouette -->
    <polygon points='50,580 65,510 80,580' fill='#1a2d1a'/>
    <polygon points='90,580 108,500 126,580' fill='#1a2d1a'/>
    <polygon points='650,580 668,505 686,580' fill='#1a2d1a'/>
    <polygon points='700,580 720,495 740,580' fill='#1a2d1a'/>
    <!-- Lake reflection -->
    <ellipse cx='400' cy='560' rx='180' ry='25' fill='#1a3a5c' opacity='.5'/>
    <ellipse cx='400' cy='560' rx='140' ry='18' fill='#2a4a6c' opacity='.4'/>
  `),

  tungi: makeSVG(`
    <defs>
      <radialGradient id='nightsky' cx='50%' cy='30%' r='70%'>
        <stop offset='0%' stop-color='#0d0820'/><stop offset='100%' stop-color='#000005'/>
      </radialGradient>
      <radialGradient id='moonlight' cx='65%' cy='18%' r='25%'>
        <stop offset='0%' stop-color='#e8e0ff' stop-opacity='.15'/><stop offset='100%' stop-color='#e8e0ff' stop-opacity='0'/>
      </radialGradient>
      <linearGradient id='citynight' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#0a0815'/><stop offset='100%' stop-color='#000005'/>
      </linearGradient>
    </defs>
    <rect width='800' height='600' fill='url(#nightsky)'/>
    <rect width='800' height='600' fill='url(#moonlight)'/>
    <!-- Milky way band -->
    <ellipse cx='400' cy='200' rx='600' ry='80' fill='white' opacity='.025' transform='rotate(-25,400,300)'/>
    <ellipse cx='400' cy='200' rx='500' ry='50' fill='white' opacity='.02' transform='rotate(-25,400,300)'/>
    <!-- Stars — many -->
    <circle cx='30' cy='30' r='1.5' fill='white' opacity='.9'/>  <circle cx='80' cy='15' r='1' fill='white' opacity='.8'/>
    <circle cx='130' cy='45' r='1.5' fill='white' opacity='.7'/> <circle cx='190' cy='20' r='1' fill='white' opacity='.9'/>
    <circle cx='240' cy='55' r='2' fill='white' opacity='.8'/>   <circle cx='310' cy='10' r='1' fill='white' opacity='.7'/>
    <circle cx='360' cy='40' r='1.5' fill='white' opacity='.9'/> <circle cx='420' cy='25' r='1' fill='white' opacity='.8'/>
    <circle cx='470' cy='60' r='1.5' fill='white' opacity='.7'/> <circle cx='530' cy='15' r='2' fill='white' opacity='.9'/>
    <circle cx='590' cy='45' r='1' fill='white' opacity='.8'/>   <circle cx='650' cy='30' r='1.5' fill='white' opacity='.7'/>
    <circle cx='710' cy='55' r='1' fill='white' opacity='.9'/>   <circle cx='770' cy='20' r='1.5' fill='white' opacity='.8'/>
    <circle cx='55' cy='90' r='1' fill='white' opacity='.6'/>    <circle cx='145' cy='110' r='1.5' fill='white' opacity='.7'/>
    <circle cx='225' cy='85' r='1' fill='white' opacity='.8'/>   <circle cx='395' cy='95' r='1.5' fill='white' opacity='.6'/>
    <circle cx='495' cy='105' r='1' fill='white' opacity='.7'/>  <circle cx='615' cy='85' r='1.5' fill='white' opacity='.8'/>
    <circle cx='695' cy='115' r='1' fill='white' opacity='.6'/>  <circle cx='755' cy='80' r='1.5' fill='white' opacity='.7'/>
    <circle cx='175' cy='155' r='1' fill='white' opacity='.5'/>  <circle cx='335' cy='145' r='1.5' fill='white' opacity='.6'/>
    <circle cx='565' cy='160' r='1' fill='white' opacity='.5'/>  <circle cx='735' cy='145' r='1.5' fill='white' opacity='.6'/>
    <!-- Moon -->
    <circle cx='520' cy='110' r='42' fill='#d8d0f0' opacity='.92'/>
    <circle cx='538' cy='100' r='42' fill='#0d0820' opacity='.88'/>
    <!-- Moon craters -->
    <circle cx='508' cy='118' r='5' fill='#c0b8e0' opacity='.4'/>
    <circle cx='522' cy='130' r='3' fill='#c0b8e0' opacity='.3'/>
    <circle cx='498' cy='105' r='4' fill='#c0b8e0' opacity='.35'/>
    <!-- City silhouette -->
    <rect x='0' y='400' width='800' height='200' fill='url(#citynight)'/>
    <rect x='20' y='310' width='50' height='100' fill='#04020c'/>
    <rect x='80' y='270' width='40' height='140' fill='#03010a'/>
    <rect x='130' y='330' width='60' height='80' fill='#04020c'/>
    <rect x='200' y='290' width='35' height='120' fill='#03010a'/>
    <rect x='245' y='350' width='55' height='60' fill='#04020c'/>
    <rect x='460' y='320' width='45' height='90' fill='#04020c'/>
    <rect x='515' y='280' width='55' height='130' fill='#03010a'/>
    <rect x='580' y='340' width='40' height='70' fill='#04020c'/>
    <rect x='630' y='295' width='60' height='115' fill='#03010a'/>
    <rect x='700' y='320' width='45' height='90' fill='#04020c'/>
    <rect x='755' y='270' width='50' height='140' fill='#03010a'/>
    <!-- Window lights -->
    <rect x='30' y='325' width='7' height='7' fill='#FFE87C' opacity='.6'/>
    <rect x='48' y='325' width='7' height='7' fill='#FFE87C' opacity='.4'/>
    <rect x='30' y='345' width='7' height='7' fill='#FFE87C' opacity='.5'/>
    <rect x='88' y='285' width='7' height='7' fill='#FFE87C' opacity='.7'/>
    <rect x='105' y='285' width='7' height='7' fill='#FFE87C' opacity='.3'/>
    <rect x='88' y='305' width='7' height='7' fill='#FFE87C' opacity='.6'/>
    <rect x='523' y='295' width='7' height='7' fill='#FFE87C' opacity='.7'/>
    <rect x='545' y='295' width='7' height='7' fill='#FFE87C' opacity='.4'/>
    <rect x='523' y='315' width='7' height='7' fill='#FFE87C' opacity='.5'/>
    <rect x='638' y='310' width='7' height='7' fill='#FFE87C' opacity='.6'/>
    <rect x='660' y='310' width='7' height='7' fill='#FFE87C' opacity='.3'/>
    <!-- Street lights -->
    <line x1='350' y1='400' x2='350' y2='480' stroke='#888' stroke-width='2'/>
    <circle cx='350' cy='398' r='6' fill='#FFE87C' opacity='.8'/>
    <ellipse cx='350' cy='405' rx='30' ry='8' fill='#FFE87C' opacity='.1'/>
    <line x1='450' y1='400' x2='450' y2='480' stroke='#888' stroke-width='2'/>
    <circle cx='450' cy='398' r='6' fill='#FFE87C' opacity='.7'/>
    <ellipse cx='450' cy='405' rx='30' ry='8' fill='#FFE87C' opacity='.08'/>
  `)
};

// Thumbnail versions (smaller SVG encoded same)
const THUMBS = {
  tabiat: SVGS.tabiat,
  yomgir: SVGS.yomgir,
  ormon:  SVGS.ormon,
  toglar: SVGS.toglar,
  tungi:  SVGS.tungi
};

const BACKGROUNDS = [
  {id:'tabiat',  label:'Tabiat',   url:SVGS.tabiat,  thumb:THUMBS.tabiat},
  {id:'yomgir',  label:"Yomg'ir",  url:SVGS.yomgir,  thumb:THUMBS.yomgir},
  {id:'ormon',   label:"O'rmon",   url:SVGS.ormon,   thumb:THUMBS.ormon},
  {id:'toglar',  label:"Tog'lar",  url:SVGS.toglar,  thumb:THUMBS.toglar},
  {id:'tungi',   label:"Tungi",    url:SVGS.tungi,   thumb:THUMBS.tungi}
];

// ══════════════════════════════════════════
//  CANVAS RAIN — smooth, realistic
// ══════════════════════════════════════════
const rainCanvas = document.getElementById('rainCanvas');
const rctx = rainCanvas.getContext('2d');
let drops = [];
let rainActive = false;
let rainAnimId = null;

function resizeRain(){
  rainCanvas.width  = window.innerWidth;
  rainCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeRain);
resizeRain();

function initDrops(){
  drops = [];
  const count = Math.floor(rainCanvas.width / 6);
  for(let i = 0; i < count; i++){
    drops.push({
      x: Math.random() * rainCanvas.width,
      y: Math.random() * rainCanvas.height,
      len: Math.random() * 22 + 8,
      speed: Math.random() * 6 + 4,
      opacity: Math.random() * 0.4 + 0.15,
      width: Math.random() * 1 + 0.5
    });
  }
}

function drawRain(){
  rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
  drops.forEach(d => {
    rctx.beginPath();
    rctx.moveTo(d.x, d.y);
    rctx.lineTo(d.x - d.len * 0.15, d.y + d.len);
    const grad = rctx.createLinearGradient(d.x, d.y, d.x - d.len*0.15, d.y + d.len);
    grad.addColorStop(0, `rgba(180,215,255,0)`);
    grad.addColorStop(0.3, `rgba(180,215,255,${d.opacity})`);
    grad.addColorStop(1, `rgba(180,215,255,${d.opacity * 0.6})`);
    rctx.strokeStyle = grad;
    rctx.lineWidth = d.width;
    rctx.stroke();
    d.y += d.speed;
    d.x -= d.speed * 0.15;
    if(d.y > rainCanvas.height){
      d.y = -d.len;
      d.x = Math.random() * rainCanvas.width;
    }
    if(d.x < -20){
      d.x = rainCanvas.width + 20;
    }
  });
  // Splash dots on bottom
  drops.forEach(d => {
    if(d.y > rainCanvas.height - 5 && Math.random() > 0.97){
      rctx.beginPath();
      rctx.arc(d.x, rainCanvas.height - 2, 1.5, 0, Math.PI * 2);
      rctx.fillStyle = `rgba(180,215,255,${d.opacity})`;
      rctx.fill();
    }
  });
}

function rainLoop(){
  drawRain();
  if(rainActive) rainAnimId = requestAnimationFrame(rainLoop);
}

function startRain(){
  if(rainActive) return;
  rainActive = true;
  initDrops();
  rainLoop();
}
function stopRain(){
  rainActive = false;
  if(rainAnimId){ cancelAnimationFrame(rainAnimId); rainAnimId = null; }
  rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
}

// ══════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════
let focusMins=25, breakMins=5, curMode='focus';
let state='idle', total=focusMins*60, remain=total;
let ivl=null, sessionCount=0, alarmIvl=null, audioCtx=null;
let soundEnabled=true, tickVolume=0.7;

// ══════════════════════════════════════════
//  SOUND
// ══════════════════════════════════════════
function toggleSound(){
  soundEnabled = !soundEnabled;
  const toggle   = document.getElementById('soundToggle');
  const icon     = document.getElementById('soundIcon');
  const title    = document.getElementById('soundTitle');
  const sub      = document.getElementById('soundSub');
  const txt      = document.getElementById('toggleText');
  const volRow   = document.getElementById('volumeRow');
  const iconSvg  = document.getElementById('soundIconSvg');
  toggle.classList.toggle('active', soundEnabled);
  icon.classList.toggle('muted', !soundEnabled);
  txt.textContent = soundEnabled ? 'YOQ' : "O'CH";
  txt.classList.toggle('on', soundEnabled);
  if(soundEnabled){
    title.textContent = 'Sanash ovozi yoqilgan';
    sub.textContent   = 'Har soniyada chiqilloq eshitiladi';
    iconSvg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`;
    volRow.classList.remove('hidden');
  } else {
    title.textContent = "Sanash ovozi o'chirilgan";
    sub.textContent   = 'Taymer jimgina ishlaydi';
    iconSvg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
    volRow.classList.add('hidden');
  }
}

function updateVolume(val){
  tickVolume = val / 100;
  document.getElementById('volVal').textContent = val + '%';
  const s = document.getElementById('volSlider');
  s.style.background = `linear-gradient(to right,var(--accent) 0%,var(--accent) ${val}%,rgba(255,255,255,.2) ${val}%,rgba(255,255,255,.2) 100%)`;
  beep(600, .08, 'square', tickVolume * 0.15);
}

function getCtx(){ if(!audioCtx) audioCtx = new(window.AudioContext||window.webkitAudioContext)(); return audioCtx; }
function beep(freq, dur, type='sine', vol=.6){
  try{
    const ctx=getCtx(), o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type=type; o.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime+dur);
    o.start(ctx.currentTime); o.stop(ctx.currentTime+dur);
  }catch(e){}
}
function chime(){
  beep(880,.3,'sine',.7); setTimeout(()=>beep(1100,.3,'sine',.7),200);
  setTimeout(()=>beep(1320,.5,'sine',.7),400); setTimeout(()=>beep(880,.3,'sine',.5),900);
  setTimeout(()=>beep(1100,.4,'sine',.5),1100);
}
function startAlarm(){ chime(); alarmIvl=setInterval(chime,2100); }
function stopAlarm(){ if(alarmIvl){ clearInterval(alarmIvl); alarmIvl=null; } }
function tick(){ if(soundEnabled) beep(700,.06,'square',tickVolume*0.12); }

// ══════════════════════════════════════════
//  TIMER
// ══════════════════════════════════════════
function startTimer(){
  if(state==='idle'){ total=(curMode==='focus'?focusMins:breakMins)*60; remain=total; }
  state='running'; renderFace();
  ivl=setInterval(()=>{ remain--; tick(); renderNums(); renderProg(); if(remain<=0){clearInterval(ivl);ivl=null;onEnd();} },1000);
  document.getElementById('btnStart').style.display='none';
  document.getElementById('btnPause').style.display='block';
  setStatus(curMode==='focus'?'Fokus vaqti boshlandi':'Tanaffus boshlandi', curMode==='focus'?'':'brk');
}
function pauseTimer(){
  if(state==='running'){
    clearInterval(ivl); ivl=null; state='paused';
    document.getElementById('pauseLabel').textContent='Davom';
    document.getElementById('pauseIcon').innerHTML='<polygon points="5 3 19 12 5 21 5 3"/>';
    setStatus('Pauza','');
  } else if(state==='paused'){
    state='running';
    document.getElementById('pauseLabel').textContent='Pauza';
    document.getElementById('pauseIcon').innerHTML='<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    ivl=setInterval(()=>{ remain--; tick(); renderNums(); renderProg(); if(remain<=0){clearInterval(ivl);ivl=null;onEnd();} },1000);
    setStatus(curMode==='focus'?'Fokus vaqti boshlandi':'Tanaffus boshlandi', curMode==='focus'?'':'brk');
  }
}
function stopTimer(){
  clearInterval(ivl); ivl=null; stopAlarm();
  state='idle'; curMode='focus'; total=focusMins*60; remain=total;
  document.getElementById('btnStart').style.display='block';
  document.getElementById('btnPause').style.display='none';
  document.getElementById('pauseLabel').textContent='Pauza';
  document.getElementById('pauseIcon').innerHTML='<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  renderNums(); renderProg();
  setStatus('Boshlashga tayyor','');
  document.getElementById('face').classList.remove('on','brk');
  document.getElementById('mlbl').textContent='TAYYOR';
  document.getElementById('nums').classList.remove('tick');
  document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.getElementById('focusSec').style.display='';
  document.getElementById('breakSec').style.display='none';
}
function onEnd(){
  startAlarm();
  if(curMode==='focus'){
    sessionCount++; renderDots();
    curMode='break'; total=breakMins*60; remain=total;
    renderNums(); renderProg();
    setStatus('Tanaffus boshlandi','brk');
    document.getElementById('mlbl').textContent='TANAFFUS';
    const f=document.getElementById('face'); f.classList.add('brk'); f.classList.remove('on');
    setTimeout(()=>{ stopAlarm(); state='idle'; startTimer(); },3000);
  } else {
    state='idle';
    setStatus('Sessiya tugadi 🎉','done');
    document.getElementById('mlbl').textContent='TUGADI';
    document.getElementById('nums').classList.remove('tick');
    document.getElementById('btnStart').style.display='block';
    document.getElementById('btnPause').style.display='none';
  }
}

function renderNums(){
  const m=Math.floor(remain/60), s=remain%60;
  document.getElementById('nums').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function renderProg(){
  document.getElementById('prog').style.strokeDashoffset=(2*Math.PI*100)*(remain/total);
}
function renderFace(){
  const f=document.getElementById('face'), n=document.getElementById('nums');
  f.classList.toggle('on', curMode==='focus');
  f.classList.toggle('brk', curMode==='break');
  n.classList.add('tick');
  document.getElementById('mlbl').textContent=curMode==='focus'?'FOKUS':'TANAFFUS';
}
function renderDots(){
  for(let i=1;i<=4;i++) document.getElementById('d'+i).classList.toggle('done',i<=sessionCount);
}
const ICONS={
  '':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  'brk':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M17 8h1a4 4 0 0 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>',
  'done':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
};
function setStatus(txt,cls){
  const b=document.getElementById('badge');
  b.innerHTML=(ICONS[cls]||ICONS[''])+' '+txt;
  b.className='badge '+(cls||'');
}

// ══════════════════════════════════════════
//  SETTINGS
// ══════════════════════════════════════════
function setMode(mode,el){
  curMode=mode;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); el.classList.add('active');
  document.getElementById('focusSec').style.display=mode==='focus'?'':'none';
  document.getElementById('breakSec').style.display=mode==='break'?'':'none';
  if(state==='idle'){
    total=remain=(mode==='focus'?focusMins:breakMins)*60;
    renderNums(); renderProg();
    document.getElementById('mlbl').textContent=mode==='focus'?'FOKUS':'TANAFFUS';
  }
}
function setFocus(m,el){
  focusMins=m;
  document.querySelectorAll('#focusSec .tbtn').forEach(b=>b.classList.remove('active')); el.classList.add('active');
  if(state==='idle'&&curMode==='focus'){ total=remain=m*60; renderNums(); renderProg(); }
}
function setBreak(m,el){
  breakMins=m;
  document.querySelectorAll('#breakSec .tbtn').forEach(b=>b.classList.remove('active')); el.classList.add('active');
  if(state==='idle'&&curMode==='break'){ total=remain=m*60; renderNums(); renderProg(); }
}
function setBg(bg, el){
  document.body.className = 'bg-' + bg.id;
  document.getElementById('bgImg').style.backgroundImage = `url("${bg.url}")`;
  document.querySelectorAll('.bgo').forEach(b=>b.classList.remove('active')); el.classList.add('active');
  if(bg.id === 'yomgir') startRain(); else stopRain();
}
function buildBgGrid(){
  const grid = document.getElementById('bgGrid');
  BACKGROUNDS.forEach((bg,i)=>{
    const btn = document.createElement('button');
    btn.className = 'bgo' + (i===0?' active':'');
    btn.style.backgroundImage = `url("${bg.thumb}")`;
    btn.innerHTML = `<div class="bgo-label">${bg.label}</div><div class="bgo-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>`;
    btn.onclick = ()=>setBg(bg, btn);
    grid.appendChild(btn);
  });
}

// ══════════════════════════════════════════
//  PARTICLES
// ══════════════════════════════════════════
(function(){
  const c = document.getElementById('particles');
  for(let i=0;i<16;i++){
    const p = document.createElement('div'); p.className='particle';
    const sz = Math.random()*5+2;
    p.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;opacity:${Math.random()*.3+.08}`;
    c.appendChild(p);
  }
})();

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
buildBgGrid();
renderNums();
renderProg();
document.getElementById('bgImg').style.backgroundImage = `url("${BACKGROUNDS[0].url}")`;