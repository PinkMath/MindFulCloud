# ☁️ MindfulCloud

> Reclaim your focus. Simplify your feeds.

### MindfulCloud is a browser extension that removes distractions and applies a calm, minimal UI across platforms like YouTube, Reddit, Twitter/X, and Pinterest.

### Designed for people who want less noise, more intention.

---

## ✨ Features

### 🎥 YouTube
- Hide recommendations
- Hide comments
- Custom progress bar color
- Custom scrubber (seek handle) color

### 🧵 Reddit
- Minimal mode
- Removes sidebar & clutter
- Centers content for focused reading

### 🐦 Twitter / X
- Focus mode
- Hides trends and “who to follow”
- Cleaner timeline experience


### 📌 Pinterest
- Dark theme
- Reduced visual noise
- Cleaner browsing experience

---

## 🎨 Philosophy

### MindfulCloud is not just a blocker — it’s a UI redesign for focus.
- No aggressive blocking
- No breaking layouts
- Just removing what distracts you

### Built around:
- calm colors
- minimal interfaces
- intentional browsing

---

### 🛠️ Tech Stack
- Manifest V3
- Vanilla JavaScript
- CSS overrides (site-specific)
- chrome.storage / browser.storage

---

## 📁 Project Structure

```
MindfulCloud/
│
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
│
├── content/
│   ├── content.js
│   └── styles/
│       ├── youtube.css
│       ├── reddit.css
│       ├── twitter.css
│       └── pinterest.css
│
├── manifest.json
└── README.md
```

---

## ⚙️ Installation

1. Click [here](https://addons.mozilla.org/en-US/firefox/mindfulcloud/)

2. Download it and enjoy!

## ⚙️ Installation (Developer)

1. Clone the repo:
```bash
git clone https://github.com/PinkMath/MindFulCloud.git
```

2. Open your browser:

### Chrome / Brave / Edge
- Go to chrome://extensions/
- Enable Developer Mode
- Click Load unpacked
- Select the project folder


### Firefox
- Go to about:debugging
- Click This Firefox
- Click Load Temporary Add-on
- Select manifest.json

---

## 🚀 Usage
1. Click the ☁️ MindfulCloud icon
2. Toggle features per platform
3. Customize YouTube colors
4. Refresh (if needed)

---

## ⚠️ Notes
- These platforms update their UI frequently
- Some selectors may break over time
- The extension is designed to be lightweight and adaptable

---

## 💡 Roadmap
 - Master enable/disable toggle
 - Per-site settings sync
 - Better YouTube live updates (no repaint hacks)
 - MutationObserver (remove polling)
 - UI redesign for popup (premium feel)
