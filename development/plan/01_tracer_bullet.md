# Tracer Bullet: Voice-to-Voice End-to-End (Vite + Offscreen Document)

The goal of this tracer bullet is to prove the end-to-end path: **Global Shortcut -> Audio Tone/Icon Indicator -> Voice Input (Offscreen) -> Gemini Live API -> Voice Output (Offscreen)**.

## 1. Project Scaffolding (Vite + TypeScript)
- [ ] Initialize a Chrome Extension using **Vite** and TypeScript.
- [ ] Configure `vite-plugin-chrome-extension` or a similar modern setup for HMR.
- [ ] Configure Prettier and ESLint.
- [ ] **Manifest V3 Setup:**
    - [ ] **Broad Permissions:** `storage`, `unlimitedStorage`, `tabs`, `activeTab`, `scripting`, `sidePanel`, `offscreen`, `audioCapture`, `desktopCapture`, `notifications`, `webNavigation`, `contextMenus`.
    - [ ] **Host Permissions:** `<all_urls>`.
    - [ ] **Global Shortcut:** Register `Alt+I` with `"global": true` in `commands`.

## 2. Configuration & Synced Storage
- [ ] Create an Options page (`options.html`) to input the Gemini Live API Key.
- [ ] Use `chrome.storage.sync` to ensure settings follow the user across devices.
- [ ] Implement a "Validate & Save" flow.

## 3. Global Trigger & Feedback UI
- [ ] Service Worker listener for `chrome.commands.onCommand`.
- [ ] **Activation Feedback:**
    - [ ] Play a brief "start" audio tone.
    - [ ] Change the Extension Action icon to a "Listening" state (ideally a simple blinking animation or distinct color).
- [ ] **Deactivation Feedback:**
    - [ ] Play a "stop" audio tone on session end.
    - [ ] Revert the icon to the default state.

## 4. Offscreen Document (Audio Handling)
- [ ] Implement the **Offscreen Document** pattern to manage the lifetime of the audio stream.
- [ ] Background script creates/manages the offscreen document when the shortcut is triggered.
- [ ] **Offscreen Logic:**
    - [ ] Request microphone access via `getUserMedia`.
    - [ ] Establish WebSocket connection to Gemini Multimodal Live API using the synced API key.
    - [ ] Stream audio chunks to Gemini.
    - [ ] Receive and play back response audio via Web Audio API.

## 5. Gemini Live Integration
- [ ] Use the Gemini Multimodal Live API (WebSocket).
- [ ] Handle the real-time interaction loop.
- [ ] Ensure the session can be interrupted by the user (re-pressing the shortcut or simply talking if VAD is enabled).

## 6. Verification
- [ ] Press `Alt+I` from any application (global check).
- [ ] Observe the blinking icon and hear the start tone.
- [ ] Say "Hello, who are you?".
- [ ] Hear Gemini respond through the speakers.
- [ ] Press `Alt+I` again to stop; hear the stop tone and see the icon revert.
