const toggle = document.getElementById('power-toggle');
const statusText = document.getElementById('status-text');

// Load state
chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== false;
    toggle.checked = isEnabled;
    statusText.innerText = isEnabled ? "ON" : "OFF";
});

// Save state
toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;
    statusText.innerText = isEnabled ? "ENABLED" : "DISABLED";
    chrome.storage.local.set({ enabled: isEnabled }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) chrome.tabs.reload(tabs[0].id);
        });
    });
});
