// =========================
// CONFIG — edit filenames here
// =========================

// Date night is 9:45 PM São Paulo time on Oct 2, 2026.
// São Paulo is UTC-03. San Diego is UTC-07 on this date.
// So this is 5:45 PM San Diego time.
const TARGET_DATE = new Date("2026-10-02T21:45:00-03:00");

const movieTitle = "Drawn Together";
const herName = "Clara";
const locationText = "São Paulo ↔ San Diego over FaceTime";

// Upload photos into /photos with these exact names.
// Add or remove filenames here depending on what you upload.
const photos = [
  "photo1.jpg",
  "photo2.jpg",
  "photo3.jpg",
  "photo4.jpg",
  "photo5.jpg"
];

// Upload videos into /videos with these exact names.
// Delete this list or leave it empty if you are not using videos.
const videos = [
  "video1.mp4",
  "video2.mp4"
];

// =========================
// State
// =========================

let idx = -1;
let musicStarted = false;

const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const hintEl = document.getElementById("hint");
const mediaPeek = document.getElementById("mediaPeek");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");
const memoryBtn = document.getElementById("memoryBtn");
const stageEl = document.getElementById("stage");
const floatingLayer = document.getElementById("floatingLayer");

const questions = [
  {
    text: "First question, my queen: are your AirPods connected and are you ready for a romantic little website?",
    options: ["Yes, amor", "Ready, my love"],
    hint: "Highly recommended: cozy position, soft lighting, and your beautiful face on standby.",
    type: "normal"
  },
  {
    text: "Would you accept a FaceTime movie date tonight at 9:45 PM São Paulo time?",
    options: ["Yes", "Yes, my king"],
    hint: "Official location: São Paulo ↔ San Diego, two cities, one screen, and way too much missing each other.",
    type: "normal"
  },
  {
    text: "Do you authorize me to order pizza for you and also get pizza for myself, so we can pretend we are sharing dinner?",
    options: ["Authorized", "Pizza date approved"],
    hint: "This is a legally binding pizza-romance agreement.",
    type: "pizza"
  },
  {
    text: "For tonight’s dress code, should it be cute-comfy, sleepy-beautiful, or dangerously adorable?",
    options: ["Cute-comfy", "Dangerously adorable"],
    hint: "To be clear, you look dangerously adorable in every possible category.",
    type: "normal"
  },
  {
    text: "Should we let Gramado memories randomly interrupt this website because I miss that trip and I miss you?",
    options: ["Yes please", "Show me us"],
    hint: "Warning: memory lane may cause smiling, saudade, and wanting another trip.",
    type: "memory"
  },
  {
    text: "Final official proposal, my queen: will you be my FaceTime movie date tonight for Drawn Together?",
    options: ["Yes, amor", "Obviously yes"],
    hint: "Pizza, movie, us, and me staring at you like I won life.",
    type: "final"
  }
];

const finalMessage =
`My queen,

Tonight I do not want distance to win.

I know you are missing me physically and intimately today, and I am missing you too — your face, your voice, your warmth, your laugh, the way everything feels softer when it is us.

So this is my little proposal:

At 9:45 PM São Paulo time, São Paulo and San Diego meet in the middle.
You with your pizza.
Me with mine.
FaceTime open.
Drawn Together ready.
And us pretending, for a little while, that the distance is smaller than it feels.

I wish I could be there beside you, pulling you close, kissing your forehead, and making you feel loved in every language I know.

But from here, I can still choose you.
I can still make a night for us.
I can still remind you that you are my queen, my love, my favorite person, and the woman I cannot stop wanting close.

So yes — this is me officially asking:

Movie date tonight?
Pizza date tonight?
Us tonight?

I love you, meu amor.`;

const memoryCaptions = [
  "A tiny Gramado memory because I miss being beside you.",
  "Evidence that we are dangerously cute together.",
  "My favorite place is still wherever you are.",
  "Saudade level: illegal.",
  "Gramado was beautiful, but you were the view.",
  "Saving this memory under: I want more of this life with you.",
  "My queen, I would go back here with you in a second.",
  "This trip lives rent-free in my heart."
];

// =========================
// Main rendering
// =========================

function render(){
  clearMedia();
  choicesEl.innerHTML = "";
  hintEl.textContent = "";

  if(idx === -1){
    titleEl.textContent = "A movie date proposal for my queen";
    subtitleEl.textContent = "Because I miss you today, because it is Friday, and because pizza + FaceTime + us sounds like the only correct plan.";

    questionEl.innerHTML = `
      My queen, before this little proposal begins...<br><br>
      do you have your AirPods connected and are you ready for some romantic background music? 🎧💌
    `;

    const startBtn = makeButton("Yes, start the romance", true);
    startBtn.onclick = () => {
      startMusic();
      idx = 0;
      showRandomMedia();
      render();
    };

    choicesEl.appendChild(startBtn);
    hintEl.textContent = "Press this first so the music can start properly.";
    backBtn.disabled = true;
    return;
  }

  const q = questions[idx];

  titleEl.textContent = "Tonight’s official plan";
  subtitleEl.textContent = "9:45 PM São Paulo / 5:45 PM San Diego • FaceTime • Pizza • Drawn Together";

  questionEl.textContent = q.text;
  hintEl.textContent = q.hint;

  q.options.forEach((opt, i) => {
    const btn = makeButton(opt, i === 1);

    btn.onclick = () => {
      handleAnswer(q);
    };

    choicesEl.appendChild(btn);
  });

  backBtn.disabled = idx <= 0;
}

function handleAnswer(q){
  if(q.type === "pizza"){
    showPizzaCard();
    return;
  }

  if(q.type === "memory"){
    showRandomMedia();
    idx++;
    setTimeout(render, 1200);
    return;
  }

  if(q.type === "final"){
    showFinal();
    return;
  }

  idx++;
  maybeShowMedia();
  render();
}

function makeButton(text, primary=false){
  const btn = document.createElement("button");
  btn.className = primary ? "choice primary" : "choice";
  btn.textContent = text;
  return btn;
}

// =========================
// Pizza interlude
// =========================

function showPizzaCard(){
  mediaPeek.className = "media-peek show";
  mediaPeek.innerHTML = `
    <div class="pizza-card">
      <strong>Pizza mission accepted 🍕</strong><br><br>
      I will order yours, get mine, and we will make this feel like a real date —
      even if our table is split between São Paulo and San Diego.
      <br><br>
      <em>My queen, send me your pizza choice and I will take care of it.</em>
    </div>
  `;

  questionEl.textContent = "Pizza logistics officially activated.";
  choicesEl.innerHTML = "";

  const continueBtn = makeButton("Continue the date-night proposal 💌", true);
  continueBtn.onclick = () => {
    idx++;
    render();
  };

  choicesEl.appendChild(continueBtn);
  hintEl.textContent = "This is a very serious pizza-romance operation.";
}

// =========================
// Random media
// =========================

function maybeShowMedia(){
  if(Math.random() > 0.45){
    showRandomMedia();
  }
}

function showRandomMedia(){
  const allMedia = [
    ...photos.map(p => ({ type:"photo", src:`photos/${p}` })),
    ...videos.map(v => ({ type:"video", src:`videos/${v}` }))
  ];

  if(allMedia.length === 0){
    return;
  }

  const pick = allMedia[Math.floor(Math.random() * allMedia.length)];
  const caption = memoryCaptions[Math.floor(Math.random() * memoryCaptions.length)];

  mediaPeek.className = "media-peek show";

  if(pick.type === "photo"){
    mediaPeek.innerHTML = `
      <div class="media-card">
        <img src="${pick.src}" alt="Gramado memory" onerror="this.closest('.media-card').style.display='none'">
        <div class="media-caption">${caption}</div>
      </div>
    `;
  } else {
    mediaPeek.innerHTML = `
      <div class="media-card">
        <video src="${pick.src}" autoplay muted loop playsinline onerror="this.closest('.media-card').style.display='none'"></video>
        <div class="media-caption">${caption}</div>
      </div>
    `;
  }
}

function clearMedia(){
  mediaPeek.className = "media-peek";
  mediaPeek.innerHTML = "";
}

// =========================
// Final page
// =========================

function showFinal(){
  burstConfetti();

  titleEl.textContent = "Proposal accepted? I hope so.";
  subtitleEl.textContent = locationText;

  const photoHTML = photos
    .map(p => `<img src="photos/${p}" alt="Gramado photo" onerror="this.style.display='none'">`)
    .join("");

  const videoHTML = videos
    .map(v => `<video src="videos/${v}" autoplay muted loop playsinline onerror="this.style.display='none'"></video>`)
    .join("");

  stageEl.innerHTML = `
    <div class="final-wrap">
      <div class="final-title">
        Tonight: pizza, FaceTime, ${movieTitle}, and my queen <span class="sparkle">💌</span>
      </div>

      <div class="question">
        Official date-night details:<br><br>
        🍕 Pizza: ordered by me<br>
        🎬 Movie: ${movieTitle}<br>
        🕘 Time: 9:45 PM São Paulo / 5:45 PM San Diego<br>
        📍 Location: São Paulo ↔ San Diego over FaceTime<br>
        👑 Guest of honor: my queen
      </div>

      <div class="final-countdown" id="finalCountdown">
        Countdown loading...
      </div>

      <div class="photoGrid">
        ${photoHTML}
        ${videoHTML}
      </div>

      <div class="final-message">${escapeHtml(finalMessage)}</div>
    </div>
  `;

  updateFinalCountdown();
}

// =========================
// Final countdown
// =========================

function updateFinalCountdown(){
  const finalCountdownEl = document.getElementById("finalCountdown");
  if(!finalCountdownEl){
    return;
  }

  const now = new Date();
  const diff = TARGET_DATE - now;

  if(diff <= 0){
    finalCountdownEl.textContent = "It is date-night time, my queen 💌";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if(days > 0){
    finalCountdownEl.textContent =
      `Countdown to our movie date: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  } else {
    finalCountdownEl.textContent =
      `Countdown to our movie date: ${hours}h ${minutes}m ${seconds}s`;
  }
}

setInterval(updateFinalCountdown, 1000);

// =========================
// Music
// =========================

function startMusic(){
  const audio = document.getElementById("bgMusic");

  if(!audio || musicStarted){
    return;
  }

  audio.volume = 0.38;
  audio.load();

  audio.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      alert("Music did not start. Check that song.mp3 is uploaded and browser-compatible.");
    });
}

// =========================
// Buttons
// =========================

backBtn.onclick = () => {
  if(idx > 0){
    idx--;
    render();
  }
};

restartBtn.onclick = () => {
  idx = -1;
  render();
};

memoryBtn.onclick = () => {
  showRandomMedia();
};

// =========================
// Decorative animations
// =========================

function createFloat(){
  const el = document.createElement("div");
  el.className = "float";
  el.textContent = ["💌", "✨", "🍕", "👑", "❤️", "🎬"][Math.floor(Math.random() * 6)];
  el.style.left = `${Math.random() * 100}%`;
  el.style.animationDuration = `${5 + Math.random() * 5}s`;
  el.style.fontSize = `${18 + Math.random() * 18}px`;

  floatingLayer.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 10000);
}

setInterval(createFloat, 700);

function burstConfetti(){
  for(let i = 0; i < 70; i++){
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = `${Math.random() * 100}%`;
    c.style.background = ["#e86f93", "#f5c77d", "#ff9fba", "#ffffff", "#b94167"][Math.floor(Math.random()*5)];
    c.style.animationDelay = `${Math.random() * .5}s`;
    c.style.transform = `rotate(${Math.random()*180}deg)`;

    document.body.appendChild(c);

    setTimeout(() => {
      c.remove();
    }, 2200);
  }
}

// =========================
// Utility
// =========================

function escapeHtml(str){
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

render();
