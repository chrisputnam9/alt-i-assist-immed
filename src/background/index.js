"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let offscreenDocumentReady = false;
async function setupOffscreen() {
    if (await chrome.offscreen.hasDocument())
        return;
    await chrome.offscreen.createDocument({
        url: 'offscreen/index.html',
        reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK, chrome.offscreen.Reason.USER_MEDIA],
        justification: 'To record audio from microphone and play back response audio.',
    });
    offscreenDocumentReady = true;
}
async function closeOffscreen() {
    if (!(await chrome.offscreen.hasDocument()))
        return;
    // Try to play stop tone first
    try {
        await chrome.runtime.sendMessage({ type: 'STOP_TONE' });
        // Give some time for the tone to play
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    catch (e) {
        console.warn('Failed to send STOP_TONE to offscreen:', e);
    }
    await chrome.offscreen.closeDocument();
    offscreenDocumentReady = false;
}
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'activate') {
        const hasDocument = await chrome.offscreen.hasDocument();
        if (hasDocument) {
            await closeOffscreen();
            chrome.action.setIcon({ path: 'assets/icon.png' });
            chrome.action.setBadgeText({ text: '' });
        }
        else {
            await setupOffscreen();
            chrome.action.setBadgeText({ text: 'ON' });
            chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
        }
    }
});
//# sourceMappingURL=index.js.map