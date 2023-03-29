const container = document.querySelector(".container");

const messageLosing = document.querySelector(".Message");
const tryAgainBtn = document.getElementById("tryAgain");
const loseOverlay = document.querySelector(".overlay");

let PermissionForClick = false;
let winning = false;
let redClicked = false;
let randomIndexesArray = [];
let countDownSeconds = 10;
let findCounter = 0;
let CELL_NUMBER = 8;
let LEVEL_OF_GAME = 1;

let imageNumber;
let timerEl;
let levelEl;
let setArray;
let imageNumberNum;

let interval;
let cells;

function timer() {
  let currentSecond = countDownSeconds;

  if (countDownSeconds == 0) {
    loseOverlay.classList.remove("none");
    messageLosing.textContent = `You are Lose in the ${LEVEL_OF_GAME} level ☹️`;
  }

  countDownSeconds--;

  let time = `00:${currentSecond >= 10 ? currentSecond : "0" + currentSecond}`;
  timerEl.textContent = time;
}

function renderGame() {
  let gameBoard;

  [...container.children].forEach((elm) => elm.remove());

  const information = document.createElement("div");
  information.className = "information-bar";

  timerEl = document.createElement("p");
  timerEl.className = "time";

  imageNumber = document.createElement("p");
  imageNumber.className = "numberOfsecrets";

  levelEl = document.createElement("p");
  levelEl.className = "level";
  levelEl.textContent = `Level: ${LEVEL_OF_GAME}`;

  information.append(timerEl, imageNumber, levelEl);

  container.appendChild(information);

  for (let i = 0; i < CELL_NUMBER / 2.2; i++) {
    let randomNum = Math.floor(Math.random() * CELL_NUMBER);
    randomIndexesArray.push(randomNum);
  }

  setArray = new Set([...randomIndexesArray]);

  // render gameBoard;
  gameBoard = document.createElement("div");
  gameBoard.className = "game-board";

  for (let i = 0; i < CELL_NUMBER; i++) {
    const cell = document.createElement("div");
    cell.classList.add("game-box", "show-loading");
    // cell.classList.add("show-loading");

    cell.addEventListener("click", () => cellClickHandler(i));
    gameBoard.appendChild(cell);
  }

  setTimeout(() => {
    interval = setInterval(timer, 1000);

    cells.forEach((elm) => elm.classList.remove("show-loading", "hasImage"));

    PermissionForClick = true;
  }, 4000);

  container.append(information, gameBoard);

  cells = gameBoard.querySelectorAll(".game-box");
  addRandomImages();
}

function addRandomImages() {
  for (let i = 0; i < randomIndexesArray.length; i++) {
    console.log(randomIndexesArray[i]);
    cells[randomIndexesArray[i]].classList.add("hasImage");
    cells[randomIndexesArray[i]].classList.add("secret");
  }

  imageNumber.textContent = setArray.size;
  imageNumberNum = setArray.size;
}

renderGame();

function cellClickHandler(index) {
  if (PermissionForClick) {
    if (cells[index].classList.contains("secret") && redClicked == false) {
      findCounter++;
      imageNumberNum--;
      imageNumber.textContent = imageNumberNum;

      cells[index].classList.add("hasImage");
      cells[index].classList.add("disabled");

      if (findCounter == setArray.size) {
        winning = true;

        if (!(LEVEL_OF_GAME >= 4)) {
          CELL_NUMBER += 4;
        }

        LEVEL_OF_GAME++;
        initGame();
        setTimeout(() => {
          winning = false;
          renderGame();
        }, 2000);
      }
    } else {
      if (winning == false && redClicked == false) {
        cells[index].classList.add("red");
        addRandomImages();
        redClicked = true;
        clearInterval(interval);
        setTimeout(() => {
          redClicked = false;
          cells[index].classList.remove("red");
          messageLosing.textContent = `You are Lose in the ${LEVEL_OF_GAME} level ☹️`;
          loseOverlay.classList.remove("none");
        }, 2000);
      }
    }
  }
}

tryAgainBtn.addEventListener("click", () => {
  LosingLogic();
  loseOverlay.classList.add("none");
});

function LosingLogic() {
  addRandomImages();
  initGame();
  LEVEL_OF_GAME = 1;
  CELL_NUMBER = 8;
  renderGame();
}

function initGame() {
  findCounter = 0;
  PermissionForClick = false;
  randomIndexesArray = [];
  countDownSeconds = 10;
  clearInterval(interval);
}
