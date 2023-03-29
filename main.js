const container = document.querySelector(".container");

let perpissionClick = false;
let gameBoard;
let cells;
let time;
let interval;
let LEVEL_OF_GAME = 8;

let randomIdxes = [];
let findCounter = 0;

let seconds = 15;

function getTime() {
  currentecond = seconds;
  if (seconds == 0) {
    addRandomImages();
    initialize();
    setTimeout(() => {
      renderGame();
    }, 1300);
  }
  seconds--;
  time.textContent = `00:${
    currentecond >= 10 ? currentecond : "0" + currentecond
  }`;
}

function timeGO() {
  interval = setInterval(getTime, 1000);
}

function renderGame() {
  gameBoard && [...gameBoard.children].forEach((elm) => elm.remove());
  [...container.children].forEach((elm) => elm.remove());
  // render information
  const information = document.createElement("div");
  information.className = "information-bar";
  time = document.createElement("p");
  time.className = "time";
  time.textContent = `00:15`;
  const level = document.createElement("p");
  level.className = "level";
  level.textContent = "Level: 1";
  information.append(time, level);

  for (let i = 0; i < LEVEL_OF_GAME / 1.5; i++) {
    let randomNum = Math.floor(Math.random() * LEVEL_OF_GAME);
    randomIdxes.push(randomNum);
  }

  // render gameBoard;
  gameBoard = document.createElement("div");
  gameBoard.className = "game-board";
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < LEVEL_OF_GAME; i++) {
    const cell = document.createElement("div");
    cell.classList.add("game-box");
    cell.classList.add("show-loading");

    cell.addEventListener("click", () => cellClickHandler(i));
    fragment.appendChild(cell);
  }

  setTimeout(() => {
    timeGO();
    cells.forEach((elm) => {
      elm.classList.remove("show-loading");
      elm.classList.remove("hasImage");
    });
    perpissionClick = true;
  }, 4000);

  gameBoard.appendChild(fragment);

  container.append(information, gameBoard);

  cells = gameBoard.querySelectorAll(".game-box");
  addRandomImages();
}

function addRandomImages() {
  for (let i = 0; i < randomIdxes.length; i++) {
    console.log(randomIdxes[i]);
    cells[randomIdxes[i]].classList.add("hasImage");
    cells[randomIdxes[i]].classList.add("secret");
  }
}

function cellClickHandler(index) {
  perpissionClick && console.log(index);
  if (perpissionClick) {
    if (cells[index].classList.contains("secret")) {
      console.log("true");
      cells[index].classList.add("hasImage");
      findCounter++;
      let array = new Set([...randomIdxes]);
      if (findCounter == array.size) {
        nextLevel();
        initialize();
        setTimeout(() => renderGame(), 1300);
      }
      console.log("correct");
    } else {
      cells[index].classList.add("red");
      resetGame();
      addRandomImages();
      initialize();
      setTimeout(() => {
        renderGame();
        cells[index].classList.remove("red");
      }, 1300);
    }
  }
}

function resetGame() {
  LEVEL_OF_GAME = 8;
}

function nextLevel() {
  LEVEL_OF_GAME += 4;
}

function initialize() {
  randomIdxes = [];
  findCounter = 0;
  perpissionClick = false;
  clearInterval(interval);
  seconds = 15;
}

renderGame();
