// ======================
// CSS INJECTION
// ======================
let styleEl = null;

const injectCSS = () => {
    if (styleEl) return;

    fetch(chrome.runtime.getURL("assets/youtube-clean.css"))
        .then(res => res.text())
        .then(css => {
            styleEl = document.createElement("style");
            styleEl.textContent = css;
            document.head.appendChild(styleEl);
        });
};

const removeCSS = () => {
    if (styleEl) {
        styleEl.remove();
        styleEl = null;
    }
};

// ======================
// APPLY SETTINGS
// ======================
const apply = () => {
    chrome.storage.local.get(
        ["enabled", "hideRecommendations", "hideComments"],
        (res) => {

            const html = document.documentElement;

            // MASTER SWITCH
            if (res.enabled === false) {
                removeCSS();
                html.classList.remove("mindful-hide-rec");
                html.classList.remove("mindful-hide-comments");
                return;
            }

            // ENABLE CSS
            injectCSS();

            // TOGGLES
            html.classList.toggle(
                "mindful-hide-rec",
                res.hideRecommendations === true
            );

            html.classList.toggle(
                "mindful-hide-comments",
                res.hideComments === true
            );
        }
    );
};

// ======================
// LISTENERS
// ======================
chrome.storage.onChanged.addListener(apply);
window.addEventListener("yt-navigate-finish", apply);

// ======================
// INIT
// ======================
apply();
