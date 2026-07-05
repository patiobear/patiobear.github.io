// const progressBar = document.getElementById("progressBar");
// const progressFill = document.getElementById("progressFill");
// const progressHandle = document.getElementById("progressHandle");
const progress = document.getElementById("progress");

const desktopVideo = document.getElementById("desktopVideo");
const mobileVideo = document.getElementById("mobileVideo");

const muteBtn = document.getElementById("muteBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const songsBtn = document.querySelector('.nav-item-songs');
const scoresBtn = document.querySelector('.nav-item-scores');
const promosBtn = document.querySelector('.nav-item-promos');
const navBtns = document.querySelectorAll('.nav-item')

const audio = new Audio();
audio.loop = true;

let currentItem;

// Your video list
let allVideos = [];
let videos = [];
let currentCategory = "songs";

const songTitle = document.getElementById("songTitle");
const songCredits = document.getElementById("songCredits");

let currentIndex = 0;

async function loadVideoList() {
  const response = await fetch("videos.json");
  allVideos = await response.json();
  changeCategory("songs");

  loadVideo(0);
  desktopVideo.classList.add("active");
}

function changeCategory(category, btn=songsBtn) {
  currentCategory = category
  navBtns.forEach((btn) => btn.classList.toggle('active', btn.dataset.category === currentCategory));
  videos = allVideos.filter(v => v.category === category);
  currentIndex = 0;
  loadVideo(0);
}

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getActiveMedia() {
  if (currentItem.type === "audio") {
      return audio;
  }

  return isMobile() ? mobileVideo : desktopVideo;
}

function loadVideo(index) {
  currentIndex = index;

  const media = videos[index];
  currentItem = media;

  songTitle.textContent = media.title;
  songCredits.innerHTML = media.credits;

  progress.value = 0;

  // AUDIO ITEM
  if (media.type === "audio") {
    desktopVideo.style.display = "none";
    mobileVideo.style.display = "none";
    artwork.style.display = "block";

    desktopVideo.pause();
    mobileVideo.pause();

    desktopVideo.classList.remove("active");
    mobileVideo.classList.remove("active");

    artwork.src = media.artwork;
    artwork.style.display = "block";

    audio.src = media.audio;
    audio.currentTime = 0;

    // Match mute state
    audio.muted = desktopVideo.muted;

    audio.play();

    return;
  }

  artwork.style.display = "none";
  desktopVideo.style.display = "";
  mobileVideo.style.display = "";

  // VIDEO ITEM
  audio.pause();

  artwork.style.display = "none";

  desktopVideo.src = media.desktop;
  mobileVideo.src = media.mobile;

  let loadedCount = 0;

  function handleLoaded() {
    loadedCount++;

    if (loadedCount === 2) {
      desktopVideo.currentTime = 0;
      mobileVideo.currentTime = 0;

      switchVideoVersion(false);
    }
  }

  desktopVideo.onloadeddata = handleLoaded;
  mobileVideo.onloadeddata = handleLoaded;

  updateArtworkPosition();
}

function updateArtworkPosition() {
  const header = document.querySelector(".top-meta-info");

  document.documentElement.style.setProperty(
    "--artwork-top",
    `${header.offsetHeight + 32}px`
  );
}

function switchVideoVersion(syncTime = true) {
  const media = videos[currentIndex];
  if (media.type === "audio") {
    return;
  }

  const useMobile = isMobile();

  const activeVideo = useMobile ? mobileVideo : desktopVideo;
  const inactiveVideo = useMobile ? desktopVideo : mobileVideo;

  if (syncTime) {
    activeVideo.currentTime = inactiveVideo.currentTime;
  }

  // Pause the hidden video
  inactiveVideo.pause();

  activeVideo.classList.add("active");
  inactiveVideo.classList.remove("active");

  activeVideo.play();
}


function nextVideo() {
  currentIndex = (currentIndex + 1) % videos.length;
  loadVideo(currentIndex);
  desktopVideo.classList.add("active");
}

function prevVideo() {
  currentIndex =
    (currentIndex - 1 + videos.length) % videos.length;
  loadVideo(currentIndex);
  desktopVideo.classList.add("active");
}

function toggleMute() {
  const activeVideo =  getActiveMedia();
  const newMuteState = !activeVideo.muted;

  desktopVideo.muted = newMuteState;
  mobileVideo.muted = newMuteState;
  audio.muted = newMuteState;

  const muteBtnIcon = muteBtn.querySelector('.mute-btn-icon');
;
muteBtnIcon.classList.toggle('fa-volume-xmark')
muteBtnIcon.classList.toggle('fa-volume-high');
  //  = newMuteState ? `<i class="fa-solid fa-volume"></i>` : `<i class="fa-solid fa-volume-xmark"></i>`;
}

// function updateProgress() {
//   const activeVideo =  getActiveMedia();

//   if (!activeVideo.duration) return;

//   const percent =
//       (activeVideo.currentTime / activeVideo.duration) * 100;

//   progressFill.style.width = percent + "%";
//   progressHandle.style.left = percent + "%";
// }

window.addEventListener("resize", updateArtworkPosition)

function updateProgress() {
  const activeVideo =  getActiveMedia();

  if (!activeVideo.duration) return;

  progress.value =
    (activeVideo.currentTime / activeVideo.duration) * 100;
}

// progressBar.addEventListener("click", (e) => {
//   const activeVideo =  getActiveMedia();

//   const rect = progressBar.getBoundingClientRect();

//   const percent = Math.max(
//     0,
//     Math.min(1, (e.clientX - rect.left) / rect.width)
//   );

//   const currentTime = percent * activeVideo.duration

//   console.log({
//     percent,
//     duration: activeVideo.duration,
//     before: activeVideo.currentTime,
//     currentTime: currentTime,
//   });

//   activeVideo.currentTime = currentTime;

//   console.log({
//     after: activeVideo.currentTime
//   });
// });

progress.addEventListener("input", () => {
  const activeVideo =  getActiveMedia();

  if (!activeVideo.duration) return;

  const newTime =
    (progress.value / 100) * activeVideo.duration;

  desktopVideo.currentTime = newTime;
  mobileVideo.currentTime = newTime;
});

desktopVideo.addEventListener("timeupdate", updateProgress);
mobileVideo.addEventListener("timeupdate", updateProgress);

// Button listeners
nextBtn.addEventListener("click", nextVideo);
prevBtn.addEventListener("click", prevVideo);
muteBtn.addEventListener("click", toggleMute);

songsBtn.addEventListener("click", (e) => changeCategory('songs', e.target))
scoresBtn.addEventListener("click", (e) => changeCategory('scores', e.target))
promosBtn.addEventListener("click", (e) => changeCategory('promos', e.target))

// Load first video on start
loadVideoList();
desktopVideo.classList.add("active");

// Handle resize switching
const mediaQuery = window.matchMedia("(max-width: 768px)");

mediaQuery.addEventListener("change", () => {
  switchVideoVersion(true);
});