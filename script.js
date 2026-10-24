// 💜 EDIT ONLY THESE WORDS FOR FUTURE REVISIONS 💜
const CONFIG = {
  girlfriendName: "Julie",
  anniversaryMessage: "Happy 2nd bb ૮꒰˵•ﻌ•˵꒱ა༶⋆˙⊹♡",
  question: "Click No",
  yesMessage: "nyehe! 💜",
  signature: "laloves ♡",

  // Add a legally obtained slow/piano version of Memories as assets/memories-slow.mp3
  musicFile: "assets/memories-slow.mp3",
  musicVolume: 0.28,

  // Edit everything between the backticks. Blank lines will be preserved.
  letterMessage: `Happy 2nd laloves! 💜

Can't believe na it's two years, so bilis nyehe. I'm always thankful for having u bb. I'm so lucky in so many ways just by having u. We're always nagaaway and have tampuhan but I know na we always find our own way to fix it. 

I know u have lots of things in mind, and I always believe na u can always do it. I always believe na my bb gurl is always strong nyehe.

I'm busy pa now, but after nito let's labas na nyehe. I'm sorry bb. U know naman how much I want to be with u rin. I love u so much, and always 💜
  ∧,,,∧
(  ̳• · • ̳)
/    づ♡ mwah`
};

// Automatically display the CONFIG text throughout the website.
function applyConfig() {
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  setText('envelopeName', `To ${CONFIG.girlfriendName} 💜`);
  setText('anniversaryTitle', CONFIG.anniversaryMessage);
  setText('questionTitle', CONFIG.question);
  setText('yesMessage', CONFIG.yesMessage);
  setText('signature', CONFIG.signature);
  setText('letterHeading', `To ${CONFIG.girlfriendName}... 💜`);
}
applyConfig();

const letter = CONFIG.letterMessage;
const sections=['intro','question','yay','memories','letter'];
function show(id){sections.forEach(s=>document.getElementById(s).classList.toggle('active',s===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='letter')typeLetter();}
function confetti(n=35){for(let i=0;i<n;i++){const e=document.createElement('span');e.className='heart';e.textContent=['♥','♡','💜'][i%3];e.style.left=Math.random()*100+'vw';e.style.animationDuration=(4+Math.random()*7)+'s';e.style.animationDelay=(-Math.random()*10)+'s';e.style.fontSize=(9+Math.random()*18)+'px';document.getElementById('hearts').append(e)}}confetti(45);
let audio;function sound(){try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(660,audio.currentTime);o.frequency.exponentialRampToValueAtTime(880,audio.currentTime+.12);g.gain.setValueAtTime(.045,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.18);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.2)}catch(e){}}
// 🎵 Background music begins only after a tap/click (mobile browser requirement).
// Music is optional: add assets/memories-slow.mp3 yourself.
const music = document.getElementById('backgroundMusic');
music.src = CONFIG.musicFile;
music.volume = Math.max(0, Math.min(1, CONFIG.musicVolume));
let enabled = true;
let musicUnavailable = false;
let musicStarted = false;
const soundButton = document.getElementById('sound');
function updateMusicButton() {
  soundButton.textContent = musicUnavailable ? '♫ add song' : (enabled ? '♫ on' : '♫ off');
  soundButton.setAttribute('aria-label', musicUnavailable ? 'Add a music file to assets' : (enabled ? 'Mute music' : 'Play music'));
}
async function playMusic() {
  if (!enabled || musicUnavailable) return;
  try { await music.play(); musicStarted = true; updateMusicButton(); }
  catch (error) { /* The user may need to tap the music button to allow playback. */ }
}
music.addEventListener('error', () => { musicUnavailable = true; updateMusicButton(); });
music.addEventListener('canplay', () => { musicUnavailable = false; updateMusicButton(); });
soundButton.onclick = () => {
  // Allow retry if the MP3 was added since the page loaded.
  if (musicUnavailable) { musicUnavailable = false; music.load(); enabled = true; playMusic(); }
  else { enabled = !enabled; if (enabled) playMusic(); else music.pause(); }
  updateMusicButton();
};
function ding() { if (enabled) sound(); }
// Start music when the recipient interacts with the surprise.
document.addEventListener('pointerdown', () => { if (!musicStarted) playMusic(); }, { passive: true });
updateMusicButton();
function goQuestion(){ding();document.getElementById('envelope').classList.add('open');setTimeout(()=>show('question'),750)}
const bow=document.getElementById('bow');bow.onclick=()=>{bow.classList.add('fired');goQuestion()};bow.onkeydown=e=>{if(e.key==='Enter')bow.click()};document.getElementById('envelope').onclick=goQuestion;document.getElementById('envelope').onkeydown=e=>{if(e.key==='Enter')goQuestion()};document.getElementById('skip').onclick=goQuestion;
const no=document.getElementById('no');let dodges=0;function dodge(e){if(e)e.preventDefault();dodges++;const x=(Math.random()-.5)*155,y=(Math.random()-.5)*90;no.style.transform=`translate(${x}px,${y}px) rotate(${Math.round(Math.random()*16-8)}deg)`;document.getElementById('tease').textContent=['Nice try! 😹','Nope, kitty says YES 🐈','Too slow! 💜','Only YES is allowed, hehe!'][dodges%4];ding()};no.addEventListener('pointerenter',dodge);no.addEventListener('click',dodge);no.addEventListener('touchstart',dodge,{passive:false});document.getElementById('yes').onclick=()=>{ding();show('yay');burst()};
function burst(){for(let i=0;i<18;i++){const h=document.createElement('span');h.textContent='💜';h.style.cssText=`position:fixed;z-index:30;left:${Math.random()*100}vw;top:${Math.random()*90}vh;font-size:${15+Math.random()*20}px;pointer-events:none`;document.body.append(h);setTimeout(()=>h.remove(),1600)}}
document.getElementById('toMemories').onclick=()=>show('memories');document.getElementById('toLetter').onclick=()=>show('letter');document.getElementById('replay').onclick=()=>{document.getElementById('envelope').classList.remove('open');bow.classList.remove('fired');no.style.transform='';show('intro')};
// If you put files photo1.jpg ... photo4.jpg into assets/, they show automatically when shared.
for(let i=0;i<4;i++){const img=document.getElementById('photo'+i);img.src='assets/photo'+(i+1)+'.jpg';img.onerror=()=>{img.removeAttribute('src');img.alt='Tap to add your photo'};document.querySelector(`[data-photo="${i}"]`).onchange=e=>{const f=e.target.files[0];if(f)img.src=URL.createObjectURL(f)}}
let typingTimer;function typeLetter(){clearInterval(typingTimer);const el=document.getElementById('typedLetter');el.textContent='';let i=0;typingTimer=setInterval(()=>{el.textContent+=letter.slice(i,i+2);i+=2;if(i>=letter.length)clearInterval(typingTimer)},25)}
