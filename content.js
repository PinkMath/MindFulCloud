const html = document.documentElement;

/* =========================
   CACHE (PREVENT UNNECESSARY WORK)
========================= */
let lastProgressColor = null;
let lastScrubberColor = null;

/* =========================
   APPLY SETTINGS
========================= */
function applySettings(settings = {}) {

  // RESET CLASSES
  html.classList.remove(
    "mindful-youtube",
    "mindful-pinterest",
    "mindful-reddit",
    "mindful-twitter",
    "yt-hide-rec",
    "yt-float-menu",
    "yt-hide-comments",
    "pt-dark",
    "rd-minimal",
    "tw-focus"
  );

  const host = location.hostname;

  /* =========================
     YOUTUBE
  ========================= */
  if (host.includes("youtube.com")) {
    html.classList.add("mindful-youtube");

    if (settings.ytHideRec) html.classList.add("yt-hide-rec");
    if (settings.ytHamburger) html.classList.add("yt-float-menu");
    if (settings.ytHideComments) html.classList.add("yt-hide-comments");

    applyYouTubeColors(settings);
  }

  /* =========================
     PINTEREST
  ========================= */
  if (host.includes("pinterest.com")) {
    html.classList.add("mindful-pinterest");
    if (settings.ptDark) html.classList.add("pt-dark");
  }

  /* =========================
     REDDIT
  ========================= */
  if (host.includes("reddit.com")) {
    html.classList.add("mindful-reddit");
    if (settings.rdMinimal) html.classList.add("rd-minimal");
  }

  /* =========================
     TWITTER / X
  ========================= */
  if (host.includes("twitter.com") || host.includes("x.com")) {
    html.classList.add("mindful-twitter");
    if (settings.twFocus) html.classList.add("tw-focus");
  }
}

/* =========================
   YOUTUBE COLORS
========================= */
function applyYouTubeColors(settings = {}) {
  const progress = settings.ytProgressColor || "#4cafef";
  const scrubber = settings.ytScrubberColor || "#ffffff";

  if (progress === lastProgressColor && scrubber === lastScrubberColor) return;

  lastProgressColor = progress;
  lastScrubberColor = scrubber;

  const root = document.documentElement;

  root.style.setProperty("--yt-progress-color", progress);
  root.style.setProperty("--yt-scrubber-color", scrubber);

  forceYouTubeRepaint();
}

/* =========================
   FORCE UI UPDATE (FIX YT NOT REFRESHING CSS)
========================= */
function forceYouTubeRepaint() {
  const player = document.querySelector("video");
  if (!player) return;

  player.style.transform = "translateZ(0)";

  requestAnimationFrame(() => {
    player.style.transform = "";
  });
}

/* =========================
   INIT
========================= */
function init() {
  chrome.storage.local.get(null, (settings) => {
    applySettings(settings);
  });
}

/* =========================
   LIVE UPDATE FROM POPUP
========================= */
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "UPDATE_SETTINGS") {
    applySettings(msg.settings || {});
  }
});

/* =========================
   SPA NAVIGATION (YouTube etc)
========================= */
let lastUrl = location.href;

setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;

    chrome.storage.local.get(null, (settings) => {
      applySettings(settings);
    });
  }
}, 1000);

// START
init();
