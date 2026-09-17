const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const cell = 18;
const cols = canvas.width / cell;
const rows = canvas.height / cell;

const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const restartBtn = document.getElementById('restart');

let snake, dir, nextDir, food, score, best, gameOver, loopId;

best = Number(localStorage.getItem('snake-best') || 0);
bestEl.textContent = best;

function randomFood() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

function reset() {
  snake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  food = randomFood();
  score = 0;
  gameOver = false;
  scoreEl.textContent = score;
  if (loopId) clearInterval(loopId);
  loopId = setInterval(tick, 110);
  draw();
}

function tick() {
  if (gameOver) return;
  dir = nextDir;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  const hitWall = head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows;
  const hitSelf = snake.some(s => s.x === head.x && s.y === head.y);

  if (hitWall || hitSelf) {
    gameOver = true;
    clearInterval(loopId);
    if (score > best) {
      best = score;
      localStorage.setItem('snake-best', best);
      bestEl.textContent = best;
    }
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
}

function draw() {
  ctx.fillStyle = '#12101c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffc94a';
  ctx.fillRect(food.x * cell + 3, food.y * cell + 3, cell - 6, cell - 6);

  snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? '#35e2c2' : '#20b89e';
    ctx.fillRect(s.x * cell + 1, s.y * cell + 1, cell - 2, cell - 2);
  });

  if (gameOver) {
    ctx.fillStyle = 'rgba(18,16,28,0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f4f1ff';
    ctx.font = "bold 20px 'Space Grotesk', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText('Game over', canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "14px 'Space Grotesk', sans-serif";
    ctx.fillText('Press Restart to try again', canvas.width / 2, canvas.height / 2 + 16);
  }
}

const keyMap = {
  ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 }, S: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 }, D: { x: 1, y: 0 }
};

window.addEventListener('keydown', e => {
  const wanted = keyMap[e.key];
  if (!wanted) return;
  e.preventDefault();
  // prevent reversing directly into itself
  if (wanted.x === -dir.x && wanted.y === -dir.y) return;
  nextDir = wanted;
});

restartBtn.addEventListener('click', reset);

reset();
