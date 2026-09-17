// Builds the homepage grid from the GAMES list in games.js.
// Edit games.js to add, remove, or reorder games — this file never changes.

const grid = document.getElementById('grid');

GAMES.forEach(game => {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = game.folder;
  card.style.setProperty('--card-color', game.color);

  card.innerHTML = `
    <div class="screen"><span class="emoji">${game.emoji}</span></div>
    <div class="info">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <span class="play-btn">Play →</span>
    </div>
  `;

  grid.appendChild(card);
});
