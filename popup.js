document.addEventListener("DOMContentLoaded", () => {

    const master = document.getElementById("master-toggle");
    const rec = document.getElementById("yt-rec-toggle");
    const comments = document.getElementById("yt-comments-toggle");

    const progress = document.getElementById("yt-progress-color");
    const scrubber = document.getElementById("yt-scrubber-color");

    // ======================
    // HEX VALIDATION
    // ======================
    const normalizeHex = (value, fallback) => {
        if (typeof value !== "string") return fallback;

        let v = value.trim();

        if (!v.startsWith("#")) v = "#" + v;

        return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v)
            ? v
            : fallback;
    };

    // ======================
    // LOAD SETTINGS
    // ======================
    chrome.storage.local.get(null, (res) => {

        master.checked = res.enabled !== false;
        rec.checked = res.hideRecommendations === true;
        comments.checked = res.hideComments === true;

        progress.value = res.progressColor || "#b1aaff";
        scrubber.value = res.scrubberColor || "#aaaaff";
    });

    // ======================
    // TOGGLES
    // ======================
    master.addEventListener("change", () => {
        chrome.storage.local.set({ enabled: master.checked });
    });

    rec.addEventListener("change", () => {
        chrome.storage.local.set({ hideRecommendations: rec.checked });
    });

    comments.addEventListener("change", () => {
        chrome.storage.local.set({ hideComments: comments.checked });
    });

    // ======================
    // COLORS (HEX INPUT)
    // ======================
    progress.addEventListener("change", () => {
        const color = normalizeHex(progress.value, "#b1aaff");
        progress.value = color;
        chrome.storage.local.set({ progressColor: color });
    });

    scrubber.addEventListener("change", () => {
        const color = normalizeHex(scrubber.value, "#aaaaff");
        scrubber.value = color;
        chrome.storage.local.set({ scrubberColor: color });
    });

    // ======================
    // ACCORDION
    // ======================
    const header = document.getElementById("yt-header");
    const content = document.getElementById("yt-content");
    const arrow = document.getElementById("yt-arrow");

    if (header && content && arrow) {
        header.addEventListener("click", () => {
            const open = content.classList.toggle("open");
            arrow.textContent = open ? "▾" : "▸";
        });
    }
});
