

const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const cross = document.querySelectorAll(".cross-btn");
const newBtn = document.querySelector(".new-game");

const winMsg = document.querySelector(".win-msg");
const winhead = document.querySelector(".win-head");
const classdo = document.querySelector(".game-end-popup");

const firstKIChije = document.querySelector(".first-ki-chije");
const main = document.querySelector("main");
const robotBTn = document.querySelector(".with-robot");
const humanBtn = document.querySelector(".with-frd");

let gameOver = false;

resetBtn.addEventListener("click", () => location.reload());
newBtn.addEventListener("click", () => location.reload());

humanBtn.addEventListener("click", () => {
  firstKIChije.style.display = "none";
  main.classList.add("open");
  
  let kiskibarri = false;
  const chnage = (abhi) => (abhi ? "X" : "O");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (gameOver) return;
      kiskibarri = !kiskibarri;
      box.innerText = chnage(kiskibarri);
      box.disabled = true;
      checkWinner();
    });
  });
});

robotBTn.addEventListener("click", () => {
  firstKIChije.style.display = "none";
  main.classList.add("open");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      checkWinner()
      if (gameOver) return; 
      box.innerText = "O";
      box.disabled = true;
      checkWinner();

      if (!gameOver) {
        setTimeout(AIKhelega, 200);
      }
    });
  });
});

function AIKhelega() {
  if (gameOver) return;
  let count = 0;
  let attempts = 0;

  while (count === 0 && attempts < 100) {
    let random = Math.floor(Math.random() * 9);
    if (!boxes[random].disabled) {
      boxes[random].innerText = "X";
      boxes[random].disabled = true;
      checkWinner();
      count++;
    }
    attempts++;
  }
}

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8]
];

const symbol = (win, loose) =>
  `${loose} tried its best but ${win} won the match. Play one more game and let the ${loose} win!`;

const checkWinner = () => {
  let isTie = true;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        gameOver = true; 
        classdo.classList.add("open");

        if (pos1Val === "O") {
          winhead.innerText = `${pos1Val} Won!`;
          winMsg.innerText = symbol(pos1Val, "X");
        } else if (pos1Val === "X") {
          winhead.innerText = `${pos1Val} Won!`;
          winMsg.innerText = symbol(pos1Val, "O");
        }
        return;
      }
    }
  }

  boxes.forEach((box) => {
    if (box.innerText === "") {
      isTie = false;
    }
  });

  if (isTie) {
    gameOver = true; 
    classdo.classList.add("open");
    winMsg.innerText = `Since both players are experts, the game ended in a tie!`;
    winhead.innerText = "Tie!";
  }
};

cross.forEach((btn) => {
  btn.addEventListener("click", () => {
    classdo.classList.remove("open");
  });
});
