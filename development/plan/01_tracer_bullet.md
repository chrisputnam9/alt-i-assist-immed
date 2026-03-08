# Tracer Bullet: Voice-to-Voice End-to-End (Vite + Offscreen Document)

The goal of this tracer bullet is to prove the end-to-end path: **Global Shortcut -> Audio Tone/Icon Indicator -> Voice Input (Offscreen) -> Gemini Live API -> Voice Output (Offscreen)**.

## 1. Project Scaffolding (Vite + TypeScript)
- [x] Initialize a Chrome Extension using **Vite** and TypeScript.
- [x] Configure `vite-plugin-chrome-extension` (CRXJS) or a similar modern setup for HMR.
- [x] Configure Prettier and ESLint.
- [x] **Manifest V3 Setup:**
    - [x] **Broad Permissions:** `storage`, `unlimitedStorage`, `tabs`, `activeTab`, `scripting`, `sidePanel`, `offscreen`, `audioCapture`, `desktopCapture`, `notifications`, `webNavigation`, `contextMenus`.
    - [x] **Host Permissions:** `<all_urls>`.
    - [x] **Global Shortcut:** Register `Alt+I` with `"global": true` in `commands`.

## 2. Configuration & Synced Storage
- [x] Create an Options page (`options.html`) to input the Gemini Live API Key.
- [x] Use `chrome.storage.sync` to ensure settings follow the user across devices.
- [x] Implement a "Validate & Save" flow.

## 3. Global Trigger & Feedback UI
- [x] Service Worker listener for `chrome.commands.onCommand`.
- [x] **Activation Feedback:**
    - [x] Play a brief "start" audio tone.
    - [x] Change the Extension Action icon to a "Listening" state (Badge "ON").
- [x] **Deactivation Feedback:**
    - [x] Play a "stop" audio tone on session end.
    - [x] Revert the icon to the default state (Remove Badge).

## 4. Offscreen Document (Audio Handling)
- [x] Implement the **Offscreen Document** pattern to manage the lifetime of the audio stream.
- [x] Background script creates/manages the offscreen document when the shortcut is triggered.
- [x] **Offscreen Logic:**
    - [x] Request microphone access via `getUserMedia`.
    - [x] Establish WebSocket connection to Gemini Multimodal Live API using the synced API key.
    - [x] Stream audio chunks to Gemini.
    - [x] Receive and play back response audio via Web Audio API.

## 5. Gemini Live Integration
- [x] Use the Gemini Multimodal Live API (WebSocket).
- [x] Handle the real-time interaction loop.
- [x] Ensure the session can be interrupted by the user (re-pressing the shortcut).

## 6. Verification
- [ ] Press `Alt+I` from any application (global check).
- [ ] Observe the blinking icon and hear the start tone.
- [ ] Say "Hello, who are you?".
- [ ] Hear Gemini respond through the speakers.
- [ ] Press `Alt+I` again to stop; hear the stop tone and see the icon revert.
