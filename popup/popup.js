document.addEventListener("DOMContentLoaded", async () => {

  const api =
    typeof browser !== "undefined" ? browser :
    typeof chrome !== "undefined" ? chrome :
    null;

  if (!api) return;

  console.log("POPUP READY");

  // =========================
  // ELEMENTS
  // =========================
  const elements = {
    ytHideRec: document.getElementById("ytHideRec"),
    ytHideComments: document.getElementById("ytHideComments"),
    rdMinimal: document.getElementById("rdMinimal"),
    twFocus: document.getElementById("twFocus"),
    ptDark: document.getElementById("ptDark"),
    ytHamburger: document.getElementById("ytHamburger"),
  };

  const progressBox = document.getElementById("ytProgressColorBox");
  const progressPicker = document.getElementById("ytProgressPicker");

  const scrubberBox = document.getElementById("ytScrubberColorBox");
  const scrubberPicker = document.getElementById("ytScrubberPicker");

  let ytProgressColor = "#4cafef";
  let ytScrubberColor = "#ffffff";

  // =========================
  // STORAGE HELPERS (UNIFIED)
  // =========================
  const storage = {
    get: () =>
      new Promise(resolve => {
        api.storage.local.get(null, data => resolve(data || {}));
      }),

    set: (data) =>
      new Promise(resolve => {
        api.storage.local.set(data, resolve);
      })
  };

  // =========================
  // LOAD SETTINGS
  // =========================
  async function loadSettings() {
    const data = await storage.get();

    console.log("LOADED:", data);

    Object.entries(elements).forEach(([key, el]) => {
      if (!el) return;
      el.checked = data[key] ?? false;
    });

    ytProgressColor = data.ytProgressColor || ytProgressColor;
    ytScrubberColor = data.ytScrubberColor || ytScrubberColor;

    if (progressBox) progressBox.style.background = ytProgressColor;
    if (scrubberBox) scrubberBox.style.background = ytScrubberColor;
  }

  // =========================
  // SAVE SETTINGS
  // =========================
  async function saveSettings() {
    const settings = {};

    Object.entries(elements).forEach(([key, el]) => {
      if (!el) return;
      settings[key] = el.checked;
    });

    settings.ytProgressColor = ytProgressColor;
    settings.ytScrubberColor = ytScrubberColor;

    console.log("SAVING:", settings);

    await storage.set(settings);

    // 🔥 push update to active tab
    api.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) return;

      api.tabs.sendMessage(tabs[0].id, {
        type: "UPDATE_SETTINGS",
        settings
      }, () => {});
    });
  }

  // =========================
  // SWITCHES
  // =========================
  Object.values(elements).forEach(el => {
    if (!el) return;
    el.addEventListener("change", saveSettings);
  });

  // =========================
  // COLOR PICKERS
  // =========================
  function setupPicker(box, picker, setColor) {
    if (!box || !picker) return;

    box.addEventListener("click", () => {
      const open = picker.style.display === "grid";

      document.querySelectorAll(".color-picker")
        .forEach(p => p.style.display = "none");

      if (!open) picker.style.display = "grid";
    });

    picker.querySelectorAll("div").forEach(el => {
      const color = el.dataset.color;
      el.style.background = color;

      el.addEventListener("click", () => {
        setColor(color);
        box.style.background = color;
        picker.style.display = "none";
        saveSettings();
      });
    });
  }

  setupPicker(progressBox, progressPicker, c => ytProgressColor = c);
  setupPicker(scrubberBox, scrubberPicker, c => ytScrubberColor = c);

  // =========================
  // ACCORDION
  // =========================
  document.querySelectorAll(".section").forEach(section => {
    const header = section.querySelector(".section-header");

    header?.addEventListener("click", () => {
      const open = section.classList.contains("open");

      document.querySelectorAll(".section")
        .forEach(s => s.classList.remove("open"));

      if (!open) section.classList.add("open");
    });
  });

  // =========================
  // INIT
  // =========================
  await loadSettings();
});
