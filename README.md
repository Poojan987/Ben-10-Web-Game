# Ben-10 Web Game

Live demo: https://ben-10-web-game.vercel.app/
Images:

<img width="490" height="800" alt="image" src="https://github.com/user-attachments/assets/be741472-d5f6-4664-b79f-343ac6d6d960" />


<img width="490" height="800" alt="image" src="https://github.com/user-attachments/assets/6062a83b-09f6-4f36-8287-2d05793ef08e" />

This repository contains a small browser game inspired by the Ben 10 franchise. It's a compact, front-end-focused project built with vanilla HTML, CSS and JavaScript and deployed on Vercel. The goal of this README is to give interviewers a quick, high-signal overview of the project, the technical choices, what I implemented, and how to run it locally.

Personal note
- All animations, sprite work, and photo editing in this project were created from scratch by me through self-directed learning and online resources (surfing and experimenting).

Why this project is interesting
- Small but complete front-end project demonstrating UI, animations, asset handling, and deployment.
- Shows ability to structure static assets and write modular, maintainable client-side code without a framework.

What I built (high level)
- Interactive single-page game (client-side only).
- Responsive layout and custom styling using CSS files in `Files/`.
- Game logic, input handling, and basic state management in `Files/ben.js`.
- Sprite/art assets and design files included for review (`*.xcf` files).

Key files
- `index.html` — entry point and markup.
- `Files/ben.js` — game logic and event handling.
- `Files/ben.css`, `Files/Hybrid.css`, `Files/Diamon.css`, `Files/prePostScreen.css` — styling and animations.
- `Files/Diamond.html` — alternate/related demo file.

Technical details / contract
- Inputs: keyboard/mouse events from the browser.
- Outputs: animated DOM updates, game state changes, and score/visual feedback.
- Error modes: graceful degradation — game falls back to static view if JS disabled; assets are local so the demo remains self-contained.

Potential improvements 
- Add unit tests for game logic and simpler functions.
- Extract game engine components and add restart/save-state features.
- Add touch controls and improve accessibility (ARIA roles, better focus handling).
- Bundle and minify assets in a small build step (optional for a static repo).

How to run locally (quick)
1. Clone the repo.
2. Open `index.html` in any modern browser.

If you'd like to run a simple local server (recommended for correct asset/content-type handling):

On Windows PowerShell you can run:

```powershell
# from the repo root
python -m http.server 8080; Start-Process "http://localhost:8080"
```

Or, if you have Node.js installed:

```powershell
npx http-server -c-1 . -p 8080; Start-Process "http://localhost:8080"
```

Design & assets
- Original artwork and layered XCF files are included in `Files/` for review.
 
