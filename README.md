# Mindful 🌿

**Mindful** is a lightweight, privacy-focused Firefox extension (Manifest V3) designed to help you reclaim your focus and eliminate distractions. It combines an aggressive ad-blocker with a "mindful pause" intervention to break the habit of mindless scrolling.

## ✨ Features

-   **Aggressive YouTube Ad-Blocking:** Uses a multi-layered approach (Network filtering + DOM manipulation + 16x speed skipping) to ensure a clean video experience.
-   **Mindful Intervention:** Automatically triggers a pause screen on high-dopamine sites like TikTok and Instagram, forcing you to confirm your intent before browsing.
-   **Global Power Toggle:** A dedicated dashboard to enable or disable the entire extension with a single click.
-   **Minimalist Dashboard:** A clean, dark-themed popup to manage your settings.
-   **Privacy First:** Works locally on your browser without tracking your data.

## 🛠️ Installation (Development Mode)

Since this extension is in development, you can load it manually in Firefox:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/mindful-extension.git
    ```
2.  **Open Firefox** and navigate to `about:debugging`.
3.  Click on **"This Firefox"** in the left sidebar.
4.  Click **"Load Temporary Add-on..."**.
5.  Select the `manifest.json` file from the project folder.
6.  **Pro Tip:** Find the extension in your Firefox "Puzzle Piece" menu and **Pin to Toolbar** for easy access to the toggle.

## 📂 Project Structure

-   `manifest.json`: Extension configuration and permissions.
-   `background.js`: Handles global state and declarative network rules.
-   `content.js`: Manages site-specific logic (ad-skipping and mindful overlays).
-   `rules.json`: Advanced network filtering rules for ad-blocking.
-   `popup.html / popup.js`: The user interface for the extension dashboard.
-   `youtube-clean.css`: Styles for removing YouTube distractions and ads.
-   `icon.png`: Extension branding.

## 🚀 How It Works

### Ad-Blocking
Unlike traditional blockers, Mindful doesn't just hide ads; it destroys them. If a network request slips through, the `content.js` script detects the ad player, mutes it, and fast-forwards the video at **16x speed** until the ad ends or a skip button is clicked automatically.

### The Toggle
The extension uses `chrome.storage` to maintain its state. When toggled OFF:
-   All network blocking rules are disabled.
-   Content scripts stop execution immediately.
-   The custom CSS themes are removed.

## 🛡️ Permissions
-   `declarativeNetRequest`: For high-performance ad-blocking.
-   `storage`: To remember your ON/OFF preference.
-   `scripting` & `activeTab`: To inject the focus tools into your current session.

---
*Stay intentional. Stay focused.*
