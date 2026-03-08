# DEVELOPMENT.md

Welcome to the development of **Alt-I**! This guide is for human developers who want to contribute to this AI-first Chrome extension.

## Project Structure

- `development/plan/`: Contains the roadmap and feature plans.
- `assets/`: Contains icons and other visual assets.
- `.github/`: Contains automated workflows for CI/CD and AI-agent collaboration.
- `src/`: (To be created) Will contain the extension's source code.

## Prerequisites

- **Node.js:** Ensure you have the latest LTS version installed.
- **npm / pnpm / yarn:** We'll be using one of these for dependency management.
- **Chrome Browser:** Required for testing the extension.

## Getting Started

### 1. Initial Setup

1.  Clone the repository.
2.  Install dependencies (when the `package.json` is ready).
3.  Configure your environment variables:
    - Create a `.env` file for local development.
    - You'll need a **Gemini Multimodal Live API Key**. Get it from [Google AI Studio](https://aistudio.google.com/).

### 2. Local Development Workflow

We use **Vite** for a modern development experience with Hot Module Replacement (HMR).

1.  Run the development server: `npm run dev` (when available).
2.  Open Chrome and go to `chrome://extensions`.
3.  Enable "Developer mode".
4.  Click "Load unpacked" and select the `dist/` directory produced by Vite.

### 3. Core Tech & Architecture

- **Manifest V3:** The extension uses MV3 for security and performance.
- **Service Worker:** Our background script manages the global `Alt+I` shortcut and controls the offscreen document.
- **Offscreen Document:** Used to access browser APIs (like `getUserMedia` and `WebAudio`) that are not available in Service Workers.
- **Gemini Live API:** Real-time voice interaction happens via a WebSocket connection.

## Coding Standards

- **TypeScript:** Everything is strictly typed.
- **Formatting:** We use **Prettier** for consistent code style.
- **Linting:** We use **ESLint** with standard rules.
- **Atomic Commits:** Prefer small, self-contained commits with clear messages.

## Deployment

The project is configured with GitHub Actions for:
- Linting and type-checking on every push.
- Packaging and publishing to the Chrome Web Store on push to `master`.

## Contribution Workflow

1.  Check the `development/plan/` directory to see what's being worked on.
2.  Use atomic commits.
3. Ensure you update `README.md`, `DEVELOPMENT.md`, `AGENTS.md`, and relevant `development/plan/` checklists for any changes you make (ideally in the same commit).
4.  Push directly to `master` during the early stages of development (this policy will be updated later).

---
*Note: This document is for human developers. Keep it updated with the latest tools, workflows, and standards.*
