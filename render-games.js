// Builds the homepage grid from the GAMES list in games.js.
// Edit games.js to add, remove, or reorder games — this file never changes.

const grid = document.getElementById('grid');

GAMES.forEach(game => {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = game.folder;
  card.target = '_blank';
  card.rel = 'noopener';
  card.style.setProperty('--card-color', game.color);

  card.innerHTML = `
    <div class="screen">
      ${
        game.logo
          ? `<img class="game-logo" src="${game.logo}" alt="${game.title} logo">`
          : `<span class="emoji">${game.emoji || ''}</span>`
      }
    </div>
    <div class="info">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <span class="play-btn">Play →</span>
    </div>
  `;

  card.addEventListener('click', event => {
    const gameWindow = window.open('about:blank', '_blank');

    if (!gameWindow) {
      return;
    }

    event.preventDefault();
    gameWindow.document.title = game.title;
    gameWindow.document.body.style.margin = '0';
    gameWindow.document.body.style.overflow = 'hidden';

    const frame = gameWindow.document.createElement('iframe');
    frame.src = game.folder;
    frame.title = game.title;
    frame.style.cssText = 'display:block;width:100vw;height:100vh;border:0;';
    gameWindow.document.body.appendChild(frame);
  });

  grid.appendChild(card);
});
