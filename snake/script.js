const div = document.querySelector(".land");
const btnBlack = document.querySelector(".black_btn");
const btnYellow = document.querySelector(".yellow_btn");
const btnWhite = document.querySelector(".white_btn");
const btnGo = document.querySelector(".go_btn");
const btnSlow = document.querySelector(".slow_btn");
const btnFast = document.querySelector(".fast_btn");

let speedOK = document.querySelector(".speed_ok");
let score = document.querySelector(".score");
let snake1 = document.querySelector(".snake1");
let snake2 = document.querySelector(".snake2");
let bestScore = document.querySelector(".best_score");

let speed = 5;
let speedCount = 0;
let scoreCount = 0;
let lives = 3;

bestScore.innerHTML = ` Best Score: ${localStorage.getItem("score")}`;

function updateScore() {
  let highScore = parseFloat(localStorage.getItem("score"));
  highScore = highScore > scoreCount ? highScore : scoreCount;
  localStorage.setItem("score", highScore);
  bestScore.innerHTML = ` Best Score: ${localStorage.getItem("score")}`;
}

btnFast.addEventListener("click", () => {
  speed -= 1;
  speedOK.innerHTML = speedCount += 1;
});
btnSlow.addEventListener("click", () => {
  speed += 1;
  speedOK.innerHTML = speedCount -= 1;
});

btnYellow.addEventListener("click", () => {
  div.style.backgroundColor = "#bbbb32";
});
btnBlack.addEventListener("click", () => {
  div.style.backgroundColor = "#000";
});

btnWhite.addEventListener("click", () => {
  div.style.backgroundColor = "#e7d9d9";
});

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const grid = 10;
let count = 0;
let snake = {
  x: 160,
  y: 160,
  dx: 0,
  dy: grid,
  cells: [],
  maxCells: 2,
};

let apple = {
  x: 200,
  y: 200,
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < speed) {
    return;
  }

  count = 0;

  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = "green";

  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      score.innerHTML = ++scoreCount;
      snake.maxCells++;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake1.style.display = "none";

        lives -= 1;
        alert(`You have ${lives} lives`);
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = scoreCount + 2;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      } else if (lives == 1) {
        snake2.style.display = "none";
      } else if (lives <= 0) {
        alert("Sorry you are Looser!");
        snake1.style.display = "block";
        snake2.style.display = "block";
        updateScore();
        scoreCount = 0;
        lives = 3;
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 2;
        snake.dx = grid;
        snake.dy = 0;
        // Ставим яблочко в случайное место
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

btnGo.addEventListener("click", () => {
  requestAnimationFrame(loop);
  btnGo.style.display = "none";
});
