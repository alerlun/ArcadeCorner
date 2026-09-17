# Arcade Corner

A small static game portal — a homepage linking out to individually playable browser games. No build step, no server, no dependencies. Pure HTML/CSS/JS, ready for GitHub Pages.

## Structure

```
game-site/
├── index.html          homepage shell (just a container div)
├── games.js            ← the one file you edit to add/remove games
├── render-games.js      turns games.js into cards — never needs editing
├── style.css            shared design system (colors, type, layout)
└── games/
    ├── snake/
    │   ├── index.html
    │   └── script.js
    ├── memory/
    │   ├── index.html
    │   └── script.js
    └── tictactoe/
        ├── index.html
        └── script.js
```

## Adding a new game (the whole workflow)

1. **Make the folder.** Duplicate any folder under `games/`, rename it, e.g. `games/pong/`. Keep `<link rel="stylesheet" href="../../style.css">` and the `.game-page` body class in its `index.html` so it inherits the shared look. Write the game logic in that folder's `script.js`.
2. **Register it.** Open `games.js` and add one object to the `GAMES` array:

   ```js
   {
     id: "pong",
     title: "Pong",
     description: "First to 5 points wins. W/S and arrow keys.",
     color: "#ffc94a",       // any hex — used for the card border and accents
     emoji: "🏓",             // shown on the card
     folder: "games/pong/index.html"
   }
   ```

3. **Done.** The homepage rebuilds its grid from `games.js` automatically — no HTML to touch, no need to open `index.html` at all. Reorder games by reordering the array; remove a game by deleting its entry (the folder can stay, it just won't be linked).

Every game folder is fully self-contained, so you can also drop in a game someone else wrote (as long as it's plain HTML/CSS/JS) without touching the others — just do steps 1 and 2 above.

## Running it locally

Just open `index.html` in a browser — everything is static. If a game needs to load its own JS via `fetch` (these don't), you'd want a local server instead, e.g. `python3 -m http.server` from this folder.

## Publishing with GitHub Pages

See the setup walkthrough your assistant gave you, or:

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder, then save.
4. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.
