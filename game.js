let colors = generateColors(6);

const squares = document.querySelectorAll(".square");
let goalColor = pickColor();
let colorDisplay = document.querySelector("#colorDisplay");
let replayDisplay = document.querySelector(".messageContainer");
let messageDisplay = document.querySelectorAll(".message");
const title = document.querySelector("#header");
let reset = document.querySelector("#replay");
const easyBtn = document.querySelector("#easy");
const hardBtn = document.querySelector("#hard");
const startBtn = document.querySelector("#start");
const infoBtn = document.querySelector("#info");
const modal = document.querySelector("#infoModal");
const close = document.querySelector(".close");

let gameOver = false;
let id;
let mode = "easy";
let seconds = 5;
let mseconds = 0;

colorDisplay.textContent = goalColor.toUpperCase();

easyBtn.addEventListener("click", function () {
  toggleMode(this, hardBtn, "easy");
});

hardBtn.addEventListener("click", function () {
  toggleMode(this, easyBtn, "hard");
});

startBtn.addEventListener("click", function () {
  if (seconds === 0 && mseconds === 0) {
  } else {
    id = window.setInterval(stopwatch, 10);
    this.classList.add("hidden");
    reset.classList.remove("hidden");
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove("hidden");
    }
  }
});

reset.addEventListener("click", function () {
  resetGame();
});

infoBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

for (let i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener("click", function () {
    if (!gameOver) {
      if (this.style.backgroundColor === goalColor) {
        for (let j = 0; j < messageDisplay.length; j++) {
          messageDisplay[j].textContent = "Correct!";
          messageDisplay[j].style.color = "green";
        }

        reset.textContent = "Play Again?";
        changeColors(goalColor);
        window.clearInterval(id);
        gameOver = true;
      } else {
        this.style.backgroundColor = "#232323";
        for (let j = 0; j < messageDisplay.length; j++) {
          messageDisplay[j].textContent = "Try Again!";
          messageDisplay[j].style.color = "red";
        }
      }
    }
  });
}

function changeColors(color) {
  title.style.backgroundColor = color;
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function generateColors(num) {
  let colors = [];
  for (let i = 0; i < num; i++) {
    colors.push(randomColor());
  }

  return colors;
}

function randomColor() {
  const red = Math.floor(Math.random() * 255 + 1);
  const green = Math.floor(Math.random() * 255 + 1);
  const blue = Math.floor(Math.random() * 255 + 1);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function stopwatch() {
  if (mseconds === 0) {
    mseconds = 100;
    seconds--;
  }
  mseconds--;

  displayTime(seconds, mseconds);

  if (seconds === 0 && mseconds === 0) {
    if (!gameOver) {
      window.clearInterval(id);
      for (let j = 0; j < messageDisplay.length; j++) {
        messageDisplay[j].textContent = "Time Up!";
        messageDisplay[j].style.color = "red";
      }
      reset.textContent = "Play Again?";
      changeColors(goalColor);
      gameOver = true;
    }
  }
}

function displayTime(seconds, mseconds) {
  let countdownDisplay = document.querySelectorAll(".countdown");
  let mDisplay, sDisplay;
  if (mseconds < 10) {
    mDisplay = "0";
  } else {
    mDisplay = "";
  }

  if (seconds < 10) {
    sDisplay = "0";
  } else {
    sDisplay = "";
  }
  for (let i = 0; i < countdownDisplay.length; i++) {
    countdownDisplay[i].textContent =
      sDisplay + seconds + ":" + mDisplay + mseconds;
  }
}

function resetGame() {
  window.clearInterval(id);
  if (mode === "easy") {
    seconds = 5;
  } else {
    seconds = 3;
  }

  mseconds = 0;

  displayTime(seconds, mseconds);
  gameOver = false;
  colors = generateColors(6);
  goalColor = pickColor();
  colorDisplay.textContent = goalColor.toUpperCase();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].classList.add("hidden");
  }
  reset.classList.add("hidden");
  startBtn.classList.remove("hidden");
  for (let j = 0; j < messageDisplay.length; j++) {
    messageDisplay[j].textContent = "";
  }
  title.style.backgroundColor = "#6a7295";
  reset.textContent = "New Colours";
}

function toggleMode(button, button2, funcMode) {
  if (
    (mode === "easy" && funcMode === "easy") ||
    (mode === "hard" && funcMode === "hard")
  ) {
  } else {
    button.classList.add("selected");
    button2.classList.remove("selected");
    mode = funcMode;
    resetGame();
  }
}
