"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
document.getElementById('save')?.addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({ apiKey }, () => {
        const status = document.getElementById('status');
        if (status) {
            status.textContent = 'Settings saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    });
});
chrome.storage.sync.get('apiKey', (data) => {
    if (data.apiKey) {
        document.getElementById('apiKey').value = data.apiKey;
    }
});
//# sourceMappingURL=index.js.map