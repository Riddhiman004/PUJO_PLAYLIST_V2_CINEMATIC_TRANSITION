const audio = document.getElementById("audio");
const $ = id => document.getElementById(id);
let eqAudioCtx = null;
let eqSource = null;
let eqFilters = [];
let eqReady = false;
let currentView = "home";
let activePlaylistKey = "oldGold";
let currentIndex = -1;
let shuffle = false;
let repeat = false;
let queue = [];
let favorites = JSON.parse(localStorage.getItem("pujoFavorites") || "[]");
let ambienceOn = false;
let ambienceCtx = null;
let ambienceMaster = null;
let ambienceTimers = [];
let toastTimer = null;
let sleepTimer = null;
let deferredInstallPrompt = null;
let moodMode = localStorage.getItem("pujoMoodMode") || "auto";

const views = ["home","playlist-old","playlist-new","mahalaya"];

function istNow(){
  return new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
}

function init(){
  initPujoIntro();
  makeParticles();
  bindNavigation();
  bindPlayer();
  setupEqualizer();
  bindMoodPanel();
  setupPujoIntroTransition();
  setupInstallApp();
  updateClock();
  updateCountdowns();
  applyMood();
  renderPlaylist();
  renderMahalaya();
  setInterval(updateClock,1000);
  setInterval(updateCountdowns,1000);
  setInterval(()=>{ if(moodMode==="auto") applyMood(); },30000);

  const savedVolume = localStorage.getItem("pujoVolume");
  if(savedVolume!==null){
    audio.volume = Number(savedVolume);
    $("volume").value = savedVolume;
  }
}
document.addEventListener("DOMContentLoaded",init);
/* =========================================
   INSTALL PUJO APP
   ========================================= */

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();

  deferredInstallPrompt = event;

  const installBtn = document.getElementById("installAppBtn");

  if (installBtn) {
    installBtn.classList.add("show");
  }
});


function setupInstallApp() {
  const installBtn = document.getElementById("installAppBtn");

  if (!installBtn) return;

  const alreadyInstalled =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (alreadyInstalled) {
    installBtn.classList.remove("show");
    return;
  }

  installBtn.addEventListener("click", async () => {

    if (!deferredInstallPrompt) {
      showToast("Install option is not available yet.");
      return;
    }

    deferredInstallPrompt.prompt();

    const choice = await deferredInstallPrompt.userChoice;

    deferredInstallPrompt = null;
    installBtn.classList.remove("show");

    if (choice.outcome === "accepted") {
      showToast("Installing PUJO PLAYLIST...");
    }
  });
}


window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;

  const installBtn = document.getElementById("installAppBtn");

  if (installBtn) {
    installBtn.classList.remove("show");
  }

  showToast("PUJO PLAYLIST installed ✨");
});
/* =========================================
   ENTER PUJO CINEMATIC TRANSITION
   ========================================= */

function setupPujoIntroTransition() {
  const buttons = document.querySelectorAll("button, a");

  buttons.forEach(btn => {
    const text = btn.textContent.trim().toUpperCase();

    if (text.includes("ENTER PUJO")) {
      btn.addEventListener("click", () => {

        if (document.body.classList.contains("pujo-entering")) return;

        document.body.classList.add("pujo-entering");

        setTimeout(() => {
          document.body.classList.remove("pujo-entering");
        }, 1400);

      });
    }
  });
}

function bindNavigation(){
  // Home cards get a cinematic open animation before the playlist appears.
  document.querySelectorAll("[data-open]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(btn.closest(".home-shell") || btn.classList.contains("mahalaya-card")){
        openWithPujoTransition(btn, btn.dataset.open);
      }else{
        showView(btn.dataset.open);
      }
    });
  });

  document.querySelectorAll(".nav-link").forEach(btn=>{
    btn.addEventListener("click",()=>showView(btn.dataset.view));
  });

  window.addEventListener("popstate",()=>{
    const key = location.hash.replace("#","");
    showView(views.includes(key)?key:"home",false);
  });
}

function openWithPujoTransition(card, targetView){
  if(card.dataset.transitioning==="1") return;
  card.dataset.transitioning="1";
  card.classList.add("is-opening");

  let overlay = document.getElementById("pageTransition");
  if(!overlay){
    overlay = document.createElement("div");
    overlay.id = "pageTransition";
    overlay.className = "page-transition";
    overlay.setAttribute("aria-hidden","true");
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = "";
  const rect = card.getBoundingClientRect();
  const x = rect.left + rect.width/2;
  const y = rect.top + rect.height/2;
  overlay.style.setProperty("--tx", x+"px");
  overlay.style.setProperty("--ty", y+"px");

  const symbols = ["✦","✧","·","•","✺","❋","🪔"];
  const colors = ["#f4d78e","#e8c56f","#fff0bf","#dca943","#c9913f"];

  for(let i=0;i<30;i++){
    const p=document.createElement("span");
    p.className="transition-particle";
    p.textContent=symbols[Math.floor(Math.random()*symbols.length)];

    const angle=Math.random()*Math.PI*2;
    const distance=75+Math.random()*250;
    const dx=Math.cos(angle)*distance;
    const dy=Math.sin(angle)*distance;
    const size=2+Math.random()*4;

    p.style.setProperty("--dx",dx+"px");
    p.style.setProperty("--dy",dy+"px");
    p.style.setProperty("--rot",(Math.random()*520-260)+"deg");
    p.style.setProperty("--size",size+"px");
    p.style.setProperty("--font",(8+Math.random()*12)+"px");
    p.style.setProperty("--delay",(Math.random()*100)+"ms");
    p.style.setProperty("--particle-color",colors[Math.floor(Math.random()*colors.length)]);
    overlay.appendChild(p);
  }

  // Let the card visibly expand first, then reveal the destination.
  requestAnimationFrame(()=>overlay.classList.add("active"));

  window.setTimeout(()=>{
    showView(targetView);
    card.classList.remove("is-opening");
    card.dataset.transitioning="0";
  },330);

  window.setTimeout(()=>{
    overlay.classList.remove("active");
  },760);
}

function showView(view,push=true){
  if(!views.includes(view)) view="home";
  currentView=view;

  // OLD GOLD and NEW DANCE intentionally share the same playlist UI.
  // Only the playlist data/header changes. This avoids duplicate IDs and
  // keeps the player/search controls working for both playlists.
  const domView = (view==="playlist-old" || view==="playlist-new")
    ? "playlist-old"
    : view;

  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  const target = $(domView);
  if(target) target.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(n=>{
    n.classList.toggle("active",n.dataset.view===view);
  });

  if(view==="playlist-old"){
    activePlaylistKey="oldGold";
    setupPlaylistHeader();
    renderPlaylist();
  }else if(view==="playlist-new"){
    activePlaylistKey="newDance";
    setupPlaylistHeader();
    renderPlaylist();
  }else if(view==="mahalaya"){
    activePlaylistKey="mahalaya";
    renderMahalaya();
  }

  if(push) history.pushState({view},"","#"+view);
  window.scrollTo({top:0,behavior:"smooth"});
}

function setupPlaylistHeader(){
  const p=playlists[activePlaylistKey];
  $("playlistBadge").textContent=p.badge;
  $("playlistTitle").textContent=p.title;
  $("playlistDesc").textContent=p.description;
  $("searchInput").value="";
}

function makeParticles(){
  const wrap=$("particles");
  const symbols=["✦","✧","•","✺","·","🪔"];
  for(let i=0;i<30;i++){
    const s=document.createElement("span");
    s.className="particle";
    s.textContent=symbols[i%symbols.length];
    s.style.left=(Math.random()*100)+"%";
    s.style.animationDelay=(-Math.random()*13)+"s";
    s.style.animationDuration=(9+Math.random()*10)+"s";
    s.style.fontSize=(7+Math.random()*11)+"px";
    wrap.appendChild(s);
  }
}

function updateClock(){
  const now=istNow();
  $("liveTime").textContent=now.toLocaleTimeString("en-IN",{hour12:true,hour:"2-digit",minute:"2-digit",second:"2-digit"});
  $("liveDate").textContent=now.toLocaleDateString("en-IN",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}).toUpperCase();

  const h=now.getHours();
  let mood="PUJO NIGHT";
  if(h>=4&&h<7)mood="MAHALAYA DAWN";
  else if(h>=7&&h<16)mood="PUJO DAY";
  else if(h>=16&&h<19)mood="PUJO EVENING";

  if(moodMode==="auto"){
    $("moodPill").textContent="🪔 PUJO MOOD · "+mood;
  }
}

function moodForHour(h){
  if(h>=4&&h<7)return "dawn";
  if(h>=7&&h<16)return "day";
  if(h>=16&&h<19)return "evening";
  return "night";
}

function applyMood(forced=null){
  const mood=forced || (moodMode==="auto"?moodForHour(istNow().getHours()):moodMode);
  document.body.classList.remove("dawn","day","evening","night");
  document.body.classList.add(mood);

  const data={
    dawn:["শুভ ভোর · GOOD MORNING, PUJO","শিউলির গন্ধে ভোরের শুরু...","PUJO DAWN",35],
    day:["শুভ শারদীয়া · SHUBHO PUJO","পুজোর গান • পুজোর আমেজ • পুজোর গল্প","PUJO DAY",65],
    evening:["PUJO EVENING","ঢাকের তালে সন্ধ্যা নামুক...","PUJO EVENING",85],
    night:["PUJO NIGHTS HIT DIFFERENT","রাত জাগুক, গান বাজুক।","PUJO NIGHT",100]
  }[mood];

  $("timeGreeting").textContent=data[0];
  $("timeLine").textContent=data[1];
  $("vibeText").textContent=data[2];
  $("vibeFill").style.width=data[3]+"%";

  if(moodMode!=="auto"){
    $("moodPill").textContent="🪔 PUJO MOOD · "+mood.toUpperCase();
  }
  document.querySelectorAll("[data-mood]").forEach(b=>b.classList.toggle("active",b.dataset.mood===moodMode));
}

function bindMoodPanel(){
  $("moodPill").addEventListener("click",()=> $("moodPanel").classList.toggle("show"));
  $("closeMood").addEventListener("click",()=> $("moodPanel").classList.remove("show"));
  document.querySelectorAll("[data-mood]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      moodMode=btn.dataset.mood;
      localStorage.setItem("pujoMoodMode",moodMode);
      applyMood();
      $("moodPanel").classList.remove("show");
      showToast(moodMode==="auto"?"Mood set to Auto":"Mood set to "+moodMode);
    });
  });
}

function updateCountdowns(){
  const now=istNow();
  const targets=[
    ["cdDays","cdHours","cdMinutes","cdSeconds",new Date(2026,9,10,0,0,0)],
    ["pujoDays","pujoHours","pujoMinutes","pujoSeconds",new Date(2026,9,16,0,0,0)]
  ];
  targets.forEach(ids=>{
    const diff=Math.max(0,ids[4]-now);
    $(ids[0]).textContent=Math.floor(diff/86400000);
    $(ids[1]).textContent=String(Math.floor(diff/3600000)%24).padStart(2,"0");
    $(ids[2]).textContent=String(Math.floor(diff/60000)%60).padStart(2,"0");
    $(ids[3]).textContent=String(Math.floor(diff/1000)%60).padStart(2,"0");
  });

  const mahDiff=Math.max(0,new Date(2026,9,10)-now);
  const pujoDiff=Math.max(0,new Date(2026,9,16)-now);
  $("mDays").textContent=Math.floor(mahDiff/86400000);
  $("sDays").textContent=Math.floor(pujoDiff/86400000);
}

function renderPlaylist(){
  const p=playlists[activePlaylistKey];
  if(!p)return;
  const list=$("songList");
  if(!list)return;
  const q=($("searchInput")?.value||"").trim().toLowerCase();
  const tracks=p.tracks.map((t,i)=>({...t,index:i})).filter(t=>
    !q || (t.title+" "+t.artist).toLowerCase().includes(q)
  );
  $("songCount").textContent=`${tracks.length} SONG${tracks.length===1?"":"S"}`;

  list.innerHTML=tracks.map(t=>`
    <div class="song-row ${t.index===currentIndex&&activePlaylistKey===getActiveKey()?"active":""}" data-index="${t.index}">
      <span class="song-no">${String(t.index+1).padStart(2,"0")}</span>
      <span class="song-icon">${t.index===currentIndex&&activePlaylistKey===getActiveKey()&&!audio.paused?"♫":"▶"}</span>
      <span class="song-details"><strong>${safe(t.title)}</strong><small>${safe(t.artist)}</small></span>
      <button class="heart" data-fav="${t.index}" type="button">${isFavorite(t)?"♥":"♡"}</button>
    </div>
  `).join("");

  list.querySelectorAll(".song-row").forEach(row=>{
    row.addEventListener("click",e=>{
      if(e.target.closest(".heart"))return;
      const index=Number(row.dataset.index);
      if(!p.tracks[index].file){
        showToast("Add this MP3 path in songs.js first.");
        return;
      }
      loadSong(activePlaylistKey,index,true);
    });
  });
  list.querySelectorAll("[data-fav]").forEach(btn=>{
    btn.addEventListener("click",e=>{
      e.stopPropagation();
      toggleFavorite(Number(btn.dataset.fav),activePlaylistKey);
    });
  });
}

function renderMahalaya(){
  const list=$("mahalayaList");
  const p=playlists.mahalaya;
  list.innerHTML=p.tracks.map((t,i)=>`
    <button class="mahalaya-track ${activePlaylistKey==="mahalaya"&&i===currentIndex?"active":""}" data-mah="${i}" type="button">
      <span class="num">${String(i+1).padStart(2,"0")}</span>
      <span><strong>${safe(t.title)}</strong><small>${safe(t.artist)}</small></span>
      <span class="duration">${t.file?"▶":"—"}</span>
      <span class="fav">${isFavorite(t)?"♥":"♡"}</span>
    </button>
  `).join("");
  list.querySelectorAll("[data-mah]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const i=Number(btn.dataset.mah);
      if(!p.tracks[i].file){showToast("Add the Mahalaya MP3 path in songs.js first.");return;}
      loadSong("mahalaya",i,true);
    });
  });
}

function getActiveKey(){return activePlaylistKey}

function loadSong(key,index,playImmediately){
  const p=playlists[key],t=p?.tracks[index];
  if(!t)return;
  if(!t.file){showToast("Add the MP3 path in songs.js first.");return}

  activePlaylistKey=key;currentIndex=index;
  audio.src=t.file;audio.load();
  $("nowTitle").textContent=t.title;$("nowArtist").textContent=t.artist;
  $("miniTitle").textContent=t.title;$("miniArtist").textContent=t.artist;
  $("miniPlayer").classList.add("show");
  $("favoriteBtn").textContent=isFavorite(t)?"♥ Favorited":"♡ Favorite";
  localStorage.setItem("pujoLastTrack",JSON.stringify({key,index,title:t.title,artist:t.artist,file:t.file}));
  updateUpNext();
  renderPlaylist();renderMahalaya();
  if(playImmediately)audio.play().catch(()=>showToast("Press play to start the song."));
}

function bindPlayer(){
  $("searchInput").addEventListener("input",renderPlaylist);
  $("shuffleBtn").addEventListener("click",()=>{
    shuffle=!shuffle;$("shuffleBtn").classList.toggle("active",shuffle);showToast(shuffle?"Shuffle ON":"Shuffle OFF");
  });
  $("repeatBtn").addEventListener("click",()=>{
    repeat=!repeat;$("repeatBtn").classList.toggle("active",repeat);showToast(repeat?"Repeat ON":"Repeat OFF");
  });
  $("playAllBtn").addEventListener("click",playAll);
  $("mahalayaPlayAll").addEventListener("click",()=>{activePlaylistKey="mahalaya";playAll()});

  $("bigPlay").addEventListener("click",togglePlay);
  $("miniPlay").addEventListener("click",togglePlay);
  $("prevBtn").addEventListener("click",previousSong);
  $("nextBtn").addEventListener("click",nextSong);
  $("miniPrev").addEventListener("click",previousSong);
  $("miniNext").addEventListener("click",nextSong);
  $("favoriteBtn").addEventListener("click",()=>{if(currentIndex>=0)toggleFavorite(currentIndex,activePlaylistKey)});
  $("queueBtn").addEventListener("click",()=>{if(currentIndex<0)return showToast("Choose a song first.");queue.push(currentIndex);updateUpNext();showToast("Added to Up Next")});
  $("sleepTimerBtn").addEventListener("click",()=>{
  $("sleepTimerMenu").classList.toggle("show");
});

document.querySelectorAll("[data-sleep]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const minutes = Number(btn.dataset.sleep);
    setSleepTimer(minutes);
    $("sleepTimerMenu").classList.remove("show");
  });
});

  $("seek").addEventListener("input",e=>seekTo(e.target.value));
  $("miniSeek").addEventListener("input",e=>seekTo(e.target.value));
  $("volume").addEventListener("input",e=>{audio.volume=Number(e.target.value);localStorage.setItem("pujoVolume",e.target.value)});
  $("muteToggle").addEventListener("click",()=>{audio.muted=!audio.muted;updatePlayerUI()});

  audio.addEventListener("play",updatePlayerUI);
  audio.addEventListener("pause",updatePlayerUI);
  audio.addEventListener("timeupdate",updateProgress);
  audio.addEventListener("loadedmetadata",updateProgress);
  audio.addEventListener("ended",handleEnded);
  audio.addEventListener("error",()=>showToast("Audio file could not be loaded — check songs.js."));
}
/* =========================================
   REAL AUDIO EQUALIZER
   ========================================= */

const EQ_CONFIG = [
  { id: "eq60", freq: 60, type: "lowshelf" },
  { id: "eq250", freq: 250, type: "peaking" },
  { id: "eq1000", freq: 1000, type: "peaking" },
  { id: "eq4000", freq: 4000, type: "peaking" },
  { id: "eq12000", freq: 12000, type: "highshelf" }
];

const EQ_PRESETS = {
  flat:  [0, 0, 0, 0, 0],
  bass:  [8, 5, 1, 0, 1],
  dance: [6, 3, -1, 3, 5],
  vocal: [-2, 0, 3, 5, 2],
  soft:  [2, 1, 0, -2, -3]
};


function ensureEqualizer() {

  if (eqReady) {
    if (eqAudioCtx?.state === "suspended") {
      eqAudioCtx.resume().catch(() => {});
    }
    return true;
  }

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    showToast("Equalizer is not supported on this device.");
    return false;
  }

  try {

    eqAudioCtx = new AudioContextClass();

    // IMPORTANT:
    // create this only ONCE for the main #audio player
    eqSource = eqAudioCtx.createMediaElementSource(audio);

    eqFilters = EQ_CONFIG.map(config => {

      const filter = eqAudioCtx.createBiquadFilter();

      filter.type = config.type;
      filter.frequency.value = config.freq;
      filter.gain.value = 0;

      if (config.type === "peaking") {
        filter.Q.value = 1;
      }

      return filter;
    });


    // AUDIO → 60 → 250 → 1K → 4K → 12K → SPEAKERS

    eqSource.connect(eqFilters[0]);

    for (let i = 0; i < eqFilters.length - 1; i++) {
      eqFilters[i].connect(eqFilters[i + 1]);
    }

    eqFilters[eqFilters.length - 1]
      .connect(eqAudioCtx.destination);


    eqReady = true;

    // Apply current slider positions
    EQ_CONFIG.forEach((config, index) => {
      const slider = document.getElementById(config.id);

      if (slider) {
        eqFilters[index].gain.value = Number(slider.value);
      }
    });


    if (eqAudioCtx.state === "suspended") {
      eqAudioCtx.resume().catch(() => {});
    }

    return true;

  } catch (error) {

    console.error("Equalizer setup failed:", error);
    showToast("Equalizer could not start.");

    return false;
  }
}


function setupEqualizer() {

  const eqBtn = document.getElementById("eqBtn");
  const panel = document.getElementById("eqPanel");
  const closeBtn = document.getElementById("closeEqBtn");
  const resetBtn = document.getElementById("resetEqBtn");

  if (!eqBtn || !panel) return;


  /* -------------------------
     Restore saved EQ
     ------------------------- */

  let savedEQ = null;

  try {
    savedEQ = JSON.parse(
      localStorage.getItem("pujoEqualizer") || "null"
    );
  } catch (e) {
    savedEQ = null;
  }

  if (savedEQ?.values) {

    EQ_CONFIG.forEach((config, index) => {
      const slider = document.getElementById(config.id);

      if (slider) {
        slider.value = savedEQ.values[index] ?? 0;
      }
    });

  }


  /* -------------------------
     Open / Close
     ------------------------- */

  eqBtn.addEventListener("click", () => {

    panel.classList.toggle("show");

    // User gesture = safe time to start Web Audio,
    // including iPhone / Safari.
    if (panel.classList.contains("show")) {
      ensureEqualizer();
    }

  });


  closeBtn?.addEventListener("click", () => {
    panel.classList.remove("show");
  });


  /* -------------------------
     Manual sliders
     ------------------------- */

  EQ_CONFIG.forEach((config, index) => {

    const slider = document.getElementById(config.id);

    if (!slider) return;

    slider.addEventListener("input", () => {

      if (!ensureEqualizer()) return;

      const value = Number(slider.value);

      eqFilters[index].gain.setTargetAtTime(
        value,
        eqAudioCtx.currentTime,
        0.03
      );


      // Manual adjustment = no preset selected
      document
        .querySelectorAll("[data-eq-preset]")
        .forEach(btn => btn.classList.remove("active"));


      saveEQSettings();

    });

  });


  /* -------------------------
     Presets
     ------------------------- */

  document
    .querySelectorAll("[data-eq-preset]")
    .forEach(button => {

      button.addEventListener("click", () => {

        if (!ensureEqualizer()) return;

        const presetName = button.dataset.eqPreset;
        const values = EQ_PRESETS[presetName];

        if (!values) return;


        EQ_CONFIG.forEach((config, index) => {

          const slider = document.getElementById(config.id);

          if (slider) {
            slider.value = values[index];
          }

          eqFilters[index].gain.setTargetAtTime(
            values[index],
            eqAudioCtx.currentTime,
            0.04
          );

        });


        document
          .querySelectorAll("[data-eq-preset]")
          .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");


        localStorage.setItem(
          "pujoEqualizer",
          JSON.stringify({
            preset: presetName,
            values: values
          })
        );


        const names = {
          flat: "Normal",
          bass: "Bass Boost",
          dance: "Dance",
          vocal: "Vocal",
          soft: "Soft"
        };

        showToast(`EQ · ${names[presetName]}`);

      });

    });


  /* -------------------------
     RESET
     ------------------------- */

  resetBtn?.addEventListener("click", () => {

    if (!ensureEqualizer()) return;

    EQ_CONFIG.forEach((config, index) => {

      const slider = document.getElementById(config.id);

      if (slider) {
        slider.value = 0;
      }

      eqFilters[index].gain.setTargetAtTime(
        0,
        eqAudioCtx.currentTime,
        0.04
      );

    });


    document
      .querySelectorAll("[data-eq-preset]")
      .forEach(btn => btn.classList.remove("active"));


    const normalBtn =
      document.querySelector('[data-eq-preset="flat"]');

    normalBtn?.classList.add("active");


    localStorage.setItem(
      "pujoEqualizer",
      JSON.stringify({
        preset: "flat",
        values: [0, 0, 0, 0, 0]
      })
    );


    showToast("Equalizer reset");

  });


  /* -------------------------
     Resume Web Audio
     after phone/browser pause
     ------------------------- */

  audio.addEventListener("play", () => {

    if (
      eqAudioCtx &&
      eqAudioCtx.state === "suspended"
    ) {
      eqAudioCtx.resume().catch(() => {});
    }

  });


  /* Mark saved preset active */

  if (savedEQ?.preset) {
    document
      .querySelector(
        `[data-eq-preset="${savedEQ.preset}"]`
      )
      ?.classList.add("active");
  } else {
    document
      .querySelector('[data-eq-preset="flat"]')
      ?.classList.add("active");
  }

}


function saveEQSettings() {

  const values = EQ_CONFIG.map(config => {
    return Number(
      document.getElementById(config.id)?.value || 0
    );
  });

  localStorage.setItem(
    "pujoEqualizer",
    JSON.stringify({
      preset: "custom",
      values: values
    })
  );
}
function playAll(){
  const p=playlists[activePlaylistKey];
  const first=p.tracks.findIndex(t=>t.file);
  if(first<0){showToast("Add your MP3 paths in songs.js first.");return}
  loadSong(activePlaylistKey,first,true);
}

function togglePlay(){
  if(!audio.src){
    const p=playlists[activePlaylistKey];
    const first=p?.tracks.findIndex(t=>t.file);
    if(first>=0)loadSong(activePlaylistKey,first,true);
    else showToast("Add your MP3 paths in songs.js first.");
    return;
  }
  audio.paused?audio.play().catch(()=>{}):audio.pause();
}

function previousSong(){const i=findNextIndex(-1);if(i>=0)loadSong(activePlaylistKey,i,true)}
function nextSong(){
  if(queue.length){loadSong(activePlaylistKey,queue.shift(),true);updateUpNext();return}
  const i=findNextIndex(1);if(i>=0)loadSong(activePlaylistKey,i,true);
}
function findNextIndex(dir){
  const p=playlists[activePlaylistKey];if(!p)return-1;
  const usable=p.tracks.map((t,i)=>({t,i})).filter(x=>x.t.file);
  if(!usable.length)return-1;
  if(currentIndex<0)return usable[0].i;
  if(shuffle&&dir===1){
    const choices=usable.filter(x=>x.i!==currentIndex);
    return choices[Math.floor(Math.random()*choices.length)]?.i??usable[0].i;
  }
  const pos=usable.findIndex(x=>x.i===currentIndex);
  return usable[(pos+dir+usable.length)%usable.length].i;
}
function handleEnded(){
  if(repeat){audio.currentTime=0;audio.play().catch(()=>{});return}
  nextSong();
}

function toggleFavorite(index,key){
  const t=playlists[key]?.tracks[index];if(!t)return;
  const id=t.file||`${key}:${t.title}`;
  favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
  localStorage.setItem("pujoFavorites",JSON.stringify(favorites));
  $("favoriteBtn").textContent=isFavorite(t)?"♥ Favorited":"♡ Favorite";
  renderPlaylist();renderMahalaya();
}
function isFavorite(t){return favorites.includes(t.file||"")||favorites.includes(`${activePlaylistKey}:${t.title}`)}

function updatePlayerUI(){
  const playing=!audio.paused;
  $("bigPlay").textContent=playing?"⏸":"▶";
  $("miniPlay").textContent=playing?"⏸":"▶";
  $("record").classList.toggle("spinning",playing);
  $("muteToggle").textContent=audio.muted||audio.volume===0?"🔇":"🔊";
  renderPlaylist();renderMahalaya();
}
function updateProgress(){
  if(!Number.isFinite(audio.duration)||audio.duration<=0)return;
  const p=audio.currentTime/audio.duration*100;
  $("seek").value=p;$("miniSeek").value=p;
  $("elapsed").textContent=formatTime(audio.currentTime);
  $("total").textContent=formatTime(audio.duration);
  $("miniElapsed").textContent=formatTime(audio.currentTime);
  $("miniTotal").textContent=formatTime(audio.duration);
}
function seekTo(v){if(Number.isFinite(audio.duration))audio.currentTime=Number(v)/100*audio.duration}
function formatTime(s){return Number.isFinite(s)?Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0"):"0:00"}
function updateUpNext(){
  const p=playlists[activePlaylistKey];
  const next=queue.length?p.tracks[queue[0]]:p.tracks[findNextIndex(1)];
  $("upNext").textContent=next?.title||"—";
}

function toggleAmbience(){
  ambienceOn?stopAmbience():startAmbience();
}
function startAmbience(){
  const ambienceAudio = new Audio(
    "songs/ambience/mythologychallengeryt-durga-puja-dhak-sound-9330.mp3"
  );

  ambienceAudio.loop = true;
  ambienceAudio.volume = Number($("ambienceVolume").value);

  ambienceAudio.play().then(()=>{
    ambienceOn = true;

    $("ambientToggle").textContent = "☀";
    $("dawnBtn").textContent = "■ END THE DAWN";

    showToast("Pujo ambience ON");
  }).catch(err=>{
    console.error("Ambience audio could not play:", err);
    showToast("Ambience could not start");
  });

  ambienceTimers = [ambienceAudio];
  window.ambienceAudio = ambienceAudio;
}

function stopAmbience(show=true){
  if(window.ambienceAudio){
    window.ambienceAudio.pause();
    window.ambienceAudio.currentTime = 0;
    window.ambienceAudio = null;
  }

  ambienceTimers = [];
  ambienceOn = false;

  $("ambientToggle").textContent = "☼";
  $("dawnBtn").textContent = "▶ BEGIN THE DAWN";

  if(show) showToast("Ambience OFF");
}
$("ambientToggle").addEventListener("click",toggleAmbience);
$("dawnBtn").addEventListener("click",toggleAmbience);

$("ambienceVolume").addEventListener("input",e=>{
  if(window.ambienceAudio){
    window.ambienceAudio.volume = Number(e.target.value);
  }
});

function safe(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function showToast(text){
  $("toast").textContent=text;$("toast").classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2200);
}
function setSleepTimer(minutes){
  if(sleepTimer){
    clearTimeout(sleepTimer);
    sleepTimer=null;
  }

  if(minutes===0){
    showToast("Sleep Timer cancelled");
    return;
  }

   showToast(`Sleep Timer set for ${minutes} minutes`);

  sleepTimer=setTimeout(()=>{
    audio.pause();
    audio.currentTime=0;
    sleepTimer=null;
    showToast("Sleep Timer ended — playback stopped");
  }, minutes*60*1000);
}
function runPujoCinematicIntro() {
  const intro = document.getElementById("pujoIntro");
  if (!intro) return;

  const firstDiya = intro.querySelector(".intro-diya");
  const orbitDiyas = intro.querySelectorAll(".orbit-diya");
  const ornament = intro.querySelector(".intro-ornament");
  const eyebrow = intro.querySelector(".intro-eyebrow");
  const title = intro.querySelector("h1");
  const subtitle = intro.querySelector(".intro-subtitle");
  const enterBtn = intro.querySelector(".enter-pujo-btn");
  const footer = intro.querySelector(".intro-footer");

  // Start from darkness
  firstDiya?.classList.remove("cine-show");
  ornament?.classList.remove("cine-show");
  eyebrow?.classList.remove("cine-show");
  title?.classList.remove("cine-show");
  subtitle?.classList.remove("cine-show");
  enterBtn?.classList.remove("cine-show");
  footer?.classList.remove("cine-show");

  orbitDiyas.forEach(diya => diya.classList.remove("cine-lit"));

  // 1. First diya
  setTimeout(() => {
    firstDiya?.classList.add("cine-show");
  }, 500);

  // 2. 10 diyas — one by one
  orbitDiyas.forEach((diya, index) => {
  setTimeout(() => {
    diya.classList.add("cine-lit");
  }, 1500 + index * 400);
});

 // 3. Ornament
setTimeout(() => {
  ornament?.classList.add("cine-show");
}, 5400);

// 4. Small heading
setTimeout(() => {
  eyebrow?.classList.add("cine-show");
}, 5700);

// 5. SHUBHO SHARODIYA
setTimeout(() => {
  title?.classList.add("cine-show");
}, 6000);

// 6. Bengali subtitle
setTimeout(() => {
  subtitle?.classList.add("cine-show");
}, 6400);

// 7. ENTER PUJO
setTimeout(() => {
  enterBtn?.classList.add("cine-show");
}, 6800);

// 8. Footer
setTimeout(() => {
  footer?.classList.add("cine-show");
}, 7100);
}
function initPujoIntro(){
  const intro = document.getElementById("pujoIntro");
  const enterBtn = document.getElementById("enterPujoBtn");
  const skipBtn = document.getElementById("skipIntroBtn");

  if(!intro || !enterBtn) return;

  runPujoCinematicIntro();


  // SKIP INTRO
  skipBtn?.addEventListener("click", () => {

    intro.classList.add("hidden");

    setTimeout(() => {
      intro.remove();
  }, 1000);

  });

  // Intro will appear every time the website is opened or refreshed.
  enterBtn.addEventListener("click",()=>{
    const introDhak = new Audio(
    "songs/ambience/mythologychallengeryt-durga-puja-dhak-sound-9330.mp3"
  );

  introDhak.volume = 0.12;
  introDhak.play().catch(()=>{});

  setTimeout(()=>{
    const fade = setInterval(()=>{
      introDhak.volume = Math.max(0, introDhak.volume - 0.015);

      if(introDhak.volume <= 0){
        clearInterval(fade);
        introDhak.pause();
      }
    },120);
  },900);
    intro.classList.add("hidden");

    setTimeout(()=>{
      intro.remove();
    },1000);
  });
}