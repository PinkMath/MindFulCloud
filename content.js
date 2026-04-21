chrome.storage.local.get(['enabled'], (result) => {
    if (result.enabled === false) return;

    const hostname = window.location.hostname;

    // --- YOUTUBE AGGRESSIVE AD-BLOCKING ---
    if (hostname.includes("youtube.com")) {
        const link = document.createElement("link");
        link.href = chrome.runtime.getURL("youtube-clean.css");
        link.type = "text/css";
        link.rel = "stylesheet";
        document.documentElement.appendChild(link);

        setInterval(() => {
            const video = document.querySelector('video');
            const adOverlay = document.querySelector('.ytp-ad-player-overlay, .ad-showing, .ad-interrupting');
            const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-skip-ad-button, .ytp-ad-skip-button-modern');

            if (adOverlay || document.querySelector('.video-ads')?.children.length > 0) {
                if (video) {
                    video.muted = true;
                    video.playbackRate = 16; 
                    if (isFinite(video.duration)) {
                        video.currentTime = video.duration - 0.1;
                    }
                }
                skipBtn?.click();
            }

            document.querySelectorAll('ytd-ad-slot-renderer, #masthead-ad, slot[name="player-ads"]').forEach(el => el.remove());
        }, 200);
    }

    // --- DISTRACTION WARNINGS (TikTok / Instagram) ---
    if (hostname.includes("tiktok.com") || hostname.includes("instagram.com")) {
        if (!document.getElementById('mindful-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'mindful-overlay';
            overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:#111;z-index:9999999;display:flex;justify-content:center;align-items:center;flex-direction:column;font-family:sans-serif;color:#eee;";
            overlay.innerHTML = `
                <div style="text-align:center; background:#222; padding:50px; border-radius:24px; border: 1px solid #333;">
                    <h1 style="color:#008080;">Mindful Pause</h1>
                    <p style="margin-bottom:30px;">Is this worth your focus right now?</p>
                    <button id="m-close" style="padding:14px 28px; background:#008080; color:white; border:none; border-radius:10px; cursor:pointer; font-weight:bold; font-size:16px;">No, I'm leaving</button>
                    <button id="m-go" style="margin-top:20px; background:none; border:none; color:#666; text-decoration:underline; cursor:pointer; display:block; width:100%;">Yes, I have a purpose</button>
                </div>`;
            document.body.appendChild(overlay);

            document.getElementById('m-close').onclick = () => window.location.href = "https://www.google.com";
            document.getElementById('m-go').onclick = () => overlay.remove();
        }
    }
});
