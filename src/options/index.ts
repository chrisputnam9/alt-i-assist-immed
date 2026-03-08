document.getElementById('save')?.addEventListener('click', () => {
  const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value;
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

chrome.storage.sync.get('apiKey', (data: { apiKey?: string }) => {
  if (data.apiKey) {
    (document.getElementById('apiKey') as HTMLInputElement).value = data.apiKey;
  }
});
