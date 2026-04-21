// Function to toggle ad-blocking rules
async function setAdBlockerState(isEnabled) {
    if (isEnabled) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({ 
            enableRulesetIds: ["ruleset_1"] 
        });
    } else {
        await chrome.declarativeNetRequest.updateEnabledRulesets({ 
            disableRulesetIds: ["ruleset_1"] 
        });
    }
}

// Watch for the toggle change from the popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        setAdBlockerState(changes.enabled.newValue);
    }
});

// Set default state to ON when installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ enabled: true });
    setAdBlockerState(true);
});
