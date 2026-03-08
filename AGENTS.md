# AGENTS.md

Welcome, AI Agent. This document provides the essential context and guidance for collaborating on the **Alt-I** project.

## Project Overview

**Alt-I** is a Chrome Extension designed to provide "AI Everywhere" via a global voice-to-voice interface. It leverages the **Gemini Multimodal Live API** for real-time, low-latency natural language interactions.

- **Category:** Live Agent (Real-time Audio/Vision interaction).
- **Interface:** Global keyboard shortcut (`Alt+I`) triggers a voice session.
- **Tech Stack:** TypeScript, Vite, Chrome Extension Manifest V3, Gemini Multimodal Live API (WebSockets).

## Core Architecture

- **Service Worker:** Manages the global shortcut and lifecycle of the interaction.
- **Offscreen Document:** Used to handle `getUserMedia` (microphone) and the Web Audio API (playback), as Service Workers cannot directly access these APIs.
- **Options Page:** Handles user configuration, specifically the Gemini API Key, stored in `chrome.storage.sync`.
- **Gemini Integration:** Uses WebSockets to stream audio to and from the Gemini Multimodal Live API.

## Your Role & Workflow

When performing tasks in this repository, adhere to the following:

1.  **Context First:** Always refer to the `development/plan/` directory for the current roadmap and architectural decisions.
2.  **Surgical Edits:** Make precise changes. Avoid broad refactors unless explicitly requested.
3.  **Atomic Commits & Builds:** Each logical change should be a separate commit. After making changes, ALWAYS run `npm run build` to update the `dist/` directory and include it in your commit.
4.  **Keep Documentation & Plans Current:** Update `README.md`, `DEVELOPMENT.md`, this `AGENTS.md` file, and relevant `development/plan/` checklists whenever a change impacts them (include these updates in the same commit).
5.  **Verify Commits:** Before finishing a task, run `git status` to ensure all intended changes are staged and committed.

## Coding Standards

- **TypeScript:** Use strict typing.
- **Linting & Formatting:** Adhere to the project's ESLint and Prettier configurations.
- **Manifest V3:** Follow all MV3 security and architectural requirements.

## GitHub Workflows

The project uses several Gemini-powered GitHub Actions for triage, planning, and review. Refer to `.github/workflows/` and `.github/commands/` to understand how these automated agents interact with the repository.

---
*Note: This document is intended for AI consumption. Keep it concise, high-signal, and updated with every structural change.*
