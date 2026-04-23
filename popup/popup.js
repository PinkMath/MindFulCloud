document.addEventListener("DOMContentLoaded", () => {

  const api =
    typeof browser !== "undefined" ? browser :
    typeof chrome !== "undefined" ? chrome :
    null;

  console.log("POPUP READY");

  // =========================
  // ELEMENTS
  // =========================
  const elements = {
    enabled: document.getElementById("enabled"),
    ytHideRec: document.getElementById("ytHideRec"),
    ytHideComments: document.getElementById("ytHideComments"),
    rdMinimal: document.getElementById("rdMinimal"),
    twFocus: document.getElementById("twFocus"),
    ptDark: document.getElementById("ptDark"),
  };

  // ===== COLOR UI =====
  const progressBox = document.getElementById("ytProgressColorBox");
  const progressPicker = document.getElementById("ytProgressPicker");

  const scrubberBox = document.getElementById("ytScrubberColorBox");
  const scrubberPicker = document.getElementById("ytScrubberPicker");

  let ytProgressColor = "#4cafef";
  let ytScrubberColor = "#ffffff";

  // =========================
  // LOAD SETTINGS
  // =========================
  function loadSettings() {
    if (!api?.storage) return;

    api.storage.local.get(null).then(data => {
      console.log("LOADED:", data);

      // switches
      Object.entries(elements).forEach(([key, el]) => {
        if (!el) return;
        el.checked = data[key] ?? false;
      });

      // colors
      if (data.ytProgressColor) {
        ytProgressColor = data.ytProgressColor;
        progressBox.style.background = ytProgressColor;
      }

      if (data.ytScrubberColor) {
        ytScrubberColor = data.ytScrubberColor;
        scrubberBox.style.background = ytScrubberColor;
      }
    });
  }

  // =========================
  // SAVE SETTINGS
  // =========================
  function saveSettings() {
    const settings = {};

    // switches
    Object.entries(elements).forEach(([key, el]) => {
      if (!el) return;
      settings[key] = el.checked;
    });

    // colors
    settings.ytProgressColor = ytProgressColor;
    settings.ytScrubberColor = ytScrubberColor;

    console.log("SAVING:", settings);

    if (api?.storage) {
      api.storage.local.set(settings);
    }

    // live update
    if (api?.tabs) {
      api.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
          if (!tabs[0]?.id) return;

          api.tabs.sendMessage(tabs[0].id, {
            type: "UPDATE_SETTINGS",
            settings
          }).catch(() => {});
        });
    }
  }

  // =========================
  // SWITCH LISTENERS
  // =========================
  Object.values(elements).forEach(el => {
    if (!el) return;
    el.addEventListener("change", saveSettings);
  });

  // =========================
  // COLOR PICKER LOGIC
  // =========================
  function setupPicker(box, picker, setColor) {
    if (!box || !picker) return;

    // toggle
    box.addEventListener("click", () => {
      const open = picker.style.display === "grid";

      document.querySelectorAll(".color-picker")
        .forEach(p => p.style.display = "none");

      if (!open) picker.style.display = "grid";
    });

    // options
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

  setupPicker(progressBox, progressPicker, (c) => ytProgressColor = c);
  setupPicker(scrubberBox, scrubberPicker, (c) => ytScrubberColor = c);

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
  loadSettings();

});
