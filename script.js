const H=document.getElementById('hearts');
function hearts(n=10){
  for(let i=0;i<n;i++){
    let x=document.createElement('span');
    x.className='heart';
    x.textContent=Math.random()>.25?'♡':'♥';
    x.style.left=(5+Math.random()*90)+'vw';
    x.style.top=(45+Math.random()*45)+'vh';
    x.style.fontSize=(15+Math.random()*22)+'px';
    x.style.animationDelay=(Math.random()*.5)+'s';
    H.appendChild(x);
    setTimeout(()=>x.remove(),3500);
  }
}
setInterval(()=>hearts(2),1800); hearts(12);

const start=new Date('2022-05-29T00:00:00');
function clock(){
  let t=Math.max(0,Date.now()-start), s=Math.floor(t/1000), d=Math.floor(s/86400);
  s%=86400; let h=Math.floor(s/3600); s%=3600;
  let m=Math.floor(s/60), sec=s%60;
  document.getElementById('d').textContent=d;
  document.getElementById('h').textContent=h;
  document.getElementById('m').textContent=m;
  document.getElementById('s').textContent=sec;
}
clock(); setInterval(clock,1000);

const box=document.getElementById('box');
const close=document.getElementById('close');
const preview=document.getElementById('preview');
document.querySelectorAll('.gallery button').forEach(b=>{
  b.onclick=()=>{
    preview.src=b.querySelector('img').src;
    box.classList.add('show');
  };
});
close.onclick=()=>box.classList.remove('show');
box.onclick=e=>{if(e.target===box)box.classList.remove('show')};

const yes=document.getElementById('yes');
const love=document.getElementById('love');
const reply=document.getElementById('reply');
yes.onclick=()=>{reply.textContent='Then let’s keep choosing each other. ♡'; hearts(28)};
love.onclick=()=>{reply.textContent='I love you too. Today, tomorrow, always. ❤️'; hearts(35)};

let ctx=null,playing=false,timer;
const music=document.getElementById('music');
music.onclick=()=>{
  if(!ctx)ctx=new (window.AudioContext||window.webkitAudioContext)();
  if(ctx.state==='suspended')ctx.resume();
  if(playing){
    clearInterval(timer); playing=false; music.textContent='♫ Music'; return;
  }
  playing=true; music.textContent='♫ Playing';
  let notes=[261.63,329.63,392,329.63,293.66,349.23,440,349.23],i=0;
  function tone(){
    let o=ctx.createOscillator(),g=ctx.createGain();
    o.type='sine'; o.frequency.value=notes[i++%notes.length];
    g.gain.setValueAtTime(.0001,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.035,ctx.currentTime+.04);
    g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.8);
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime+.85);
  }
  tone(); timer=setInterval(tone,850);
};