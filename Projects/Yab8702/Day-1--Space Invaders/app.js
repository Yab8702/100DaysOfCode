const grid = document.querySelector(".grid");
const resultsDisplay = document.querySelector(".results");
const easyButton = document.querySelector(".easyButton");
const mediumButton = document.querySelector(".mediumButton");
const hardButton = document.querySelector(".hardButton");
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;
let difficulty = 600; // Default difficulty
let dis = false;

easyButton.addEventListener("click", function () {
  if (!this.disabled) {
    setDifficulty("easy");
    updateButtonColor(this);
    disableOtherButtons(this);
  }
});

mediumButton.addEventListener("click", function () {
  if (!this.disabled) {
    setDifficulty("medium");
    updateButtonColor(this);
    disableOtherButtons(this);
  }
});

hardButton.addEventListener("click", function () {
  if (!this.disabled) {
    setDifficulty("hard");
    updateButtonColor(this);
    disableOtherButtons(this);
  }
});

function updateButtonColor(clickedButton) {
  // Reset color for all buttons
  easyButton.style.backgroundColor = "";
  mediumButton.style.backgroundColor = "";
  hardButton.style.backgroundColor = "";

  // Set color for the clicked button
  clickedButton.style.backgroundColor = "green";
  clickedButton.style.color = "white";
}
function disableOtherButtons(clickedButton) {
  // Disable other buttons
  if (clickedButton === easyButton) {
    mediumButton.disabled = true;
    hardButton.disabled = true;
  } else if (clickedButton === mediumButton) {
    easyButton.disabled = true;
    hardButton.disabled = true;
  } else if (clickedButton === hardButton) {
    easyButton.disabled = true;
    mediumButton.disabled = true;
  }
}
function setDifficulty(level) {
  switch (level) {
    case "easy":
      difficulty = 1000;
      dis = true;
      break;
    case "medium":
      difficulty = 600;
      dis = true;
      break;
    case "hard":
      difficulty = 200;
      dis = true;
      break;
    default:
      difficulty = 600;
  }

  if (dis) {
    clearInterval(invadersId);
    invadersId = setInterval(moveInvaders, difficulty);
  }
}
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
      squares[alienInvaders[i]].style.backgroundColor = "blue"; // Rectangle invaders color
      squares[alienInvaders[i]].style.borderRadius = ""; // Reset border-radius
    }
  }
}

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
    squares[alienInvaders[i]].style.backgroundColor = ""; // Reset color
    squares[alienInvaders[i]].style.borderRadius = ""; // Reset border-radius
  }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  draw();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultsDisplay.innerHTML = "GAME OVER";
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length - 1) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(invadersId);
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = "YOU WIN";
    clearInterval(invadersId);
    grid.classList.add("celebrate");

    // Reset the celebration class after the animation completes
    setTimeout(() => {
      grid.classList.remove("celebrate");
      grid.style.backgroundColor = "gold";
    }, 1000);
  }
}

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");

    // Check if currentLaserIndex is within the valid range
    if (currentLaserIndex - width >= 0) {
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
        aliensRemoved.push(alienRemoved);
        results++;
        resultsDisplay.innerHTML = results;
      }
    } else {
      // If currentLaserIndex is out of bounds, clear the interval
      clearInterval(laserId);
    }
  }

  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
      break;
  }
}

document.addEventListener("keydown", shoot);
