const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");

const cross = document.querySelectorAll(".cross-btn");
const newBtn = document.querySelectorAll(".new-game");

const turnO = true;

const appender = document.querySelector(".hide-things");
const winMsg = document.querySelector(".win-msg");
const winhead = document.querySelector(".win-head");

const classdo = document.querySelector(".game-end-popup");

// boxes.forEach((box) => {
//   box.addEventListener("click", () => {
//     // console.log("box was Clicked");
//     if (turnO) {
//       box.innerText = "O";
//       turnO = false;
//     } else {
//       box.innerText = "X";
//       turnO = true;
//     }
//     box.disabled = true;

//     checkWinner();
//   });
// });

let kiskibarri = false;
const chnage = (abhi) => (abhi ? "X" : "O");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    kiskibarri = !kiskibarri;
    box.innerText = chnage(kiskibarri);
    // console.log(kiskibarri)
    box.disabled = true;
    checkWinner();
  });
});

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const symbol = (win, loose) =>
  `${loose} tried it's best but ${win} won the match, play one more game and let the ${loose} win.`;

const checkWinner = () => {
  let isTie = true;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        classdo.classList.add("open");
        if (pos1Val === "O") {
          winhead.innerText = `${pos1Val} Won!`;
          winMsg.innerText = symbol(pos1Val, "X");
          boxes.forEach((box) => {
            box.disabled = true;
          })
        } else if (pos1Val === "X") {
          winhead.innerText = `${pos1Val} Won!`;
          winMsg.innerText = symbol(pos1Val, "O");
          boxes.forEach((box) => {
            box.disabled = true;
          })
        }
      }
    }
  }
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isTie = false; // If any box is empty, it's not a tie
    }
  });

  if (isTie) {
    classdo.classList.add("open"); // Show tie popup
    winMsg.innerText = `Since both player are Expert , The game ended but no one won`;
    winhead.innerText = "Tie!";
  }
  cross.forEach((btn) => {
    btn.addEventListener("click", () => {
      classdo.classList.remove("open");
    });
  });
};

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    classdo.classList.remove("open");
    box.innerText = "";
    box.disabled = false;
  });
});
// console.log(newBtn);
newBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    boxes.forEach((box) => {
      classdo.classList.remove("open");
      box.innerText = "";
      box.disabled = false;
    });
  });
});
