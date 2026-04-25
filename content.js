const html = document.documentElement;

const storage =
  typeof browser !== "undefined"
    ? browser.storage.local
    : chrome.storage.local;

const runtime =
  typeof browser !== "undefined"
    ? browser.runtime
    : chrome.runtime;

let current = {};

/* =========================
   APPLY STATE
========================= */
function applyYouTubeColors(settings = {}) {
  const progress = settings.ytProgressColor || "#4cafef";
  const scrubber = settings.ytScrubberColor || "#ffffff";

  const root = document.documentElement;

  root.style.setProperty("--yt-progress-color", progress);
  root.style.setProperty("--yt-scrubber-color", scrubber);
}

function apply(settings = {}) {
  current = settings;

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

  if (host.includes("youtube.com")) {
    html.classList.add("mindful-youtube");

    if (settings.ytHideRec) html.classList.add("yt-hide-rec");
    if (settings.ytHamburger) html.classList.add("yt-float-menu");
    if (settings.ytHideComments) html.classList.add("yt-hide-comments");

    applyYouTubeColors(settings);
  }

  if (host.includes("pinterest.com") && settings.ptDark) {
    html.classList.add("pt-dark");
  }

  if (host.includes("reddit.com") && settings.rdMinimal) {
    html.classList.add("rd-minimal");
  }

  if ((host.includes("x.com") || host.includes("twitter.com")) && settings.twFocus) {
    html.classList.add("tw-focus");
  }
}

/* =========================
   SAFE FIREFOX STORAGE LOAD
========================= */
async function loadSettings() {
  try {
    const data = await storage.get();
    return data || {};
  } catch (e) {
    console.error("Storage error:", e);
    return {};
  }
}

/* =========================
   INIT (IMPORTANT FIX)
========================= */
async function init() {
  const settings = await loadSettings();

  // small delay fixes Firefox race condition on reload
  requestAnimationFrame(() => {
    apply(settings);
  });
}

/* =========================
   LISTEN POPUP CHANGES
========================= */
runtime.onMessage.addListener((msg) => {
  if (msg?.type === "UPDATE_SETTINGS") {
    apply(msg.settings || {});
  }
});

/* =========================
   FIX: FIREFOX SPA NAVIGATION
========================= */
function watchUrl() {
  let last = location.href;

  const obs = new MutationObserver(() => {
    if (location.href !== last) {
      last = location.href;
      init();
    }
  });

  obs.observe(document, {
    subtree: true,
    childList: true
  });
}

/* =========================
   FIREFOX SAFE INIT DELAY
========================= */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

window.addEventListener("load", init);

watchUrl();
