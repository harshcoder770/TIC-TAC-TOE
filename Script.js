let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");



let cross = document.querySelectorAll(".cross-btn");
let newBtn = document.querySelectorAll(".new-game");

let turnO = true;

let appender = document.querySelector(".hide-things");





let oWin = document.querySelector('.o-win')
let xWin = document.querySelector('.x-win')
let tie = document.querySelector('.tie')

const resetGame = () => {
  turnO = true;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was Clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
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

const checkWinner = () => {
    let isTie  = true;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val === "O") {
          oWin.classList.add('open')
      
        
          
        } 
        else if (pos1Val === 'X'){
            xWin.classList.add('open')
            
            
        }

        cross.forEach((btn) => {
            btn.addEventListener('click' , ()=> {
                oWin.classList.remove('open')
                xWin.classList.remove('open')
              
            })
        })
        return


    };
    
}
}
boxes.forEach(box => {
    if (box.innerText === "") {
      isTie = false; // If any box is empty, it's not a tie
    }
  });

  if (isTie) {
    tie.classList.add("open"); // Show tie popup
  }
 cross.forEach((btn) => {
    btn.addEventListener("click", () => {
      tie.classList.remove("open");
    });
  });
      
      
    }
    
  


resetBtn.addEventListener("click", () => {
  window.location.reload();
});
console.log(newBtn)
newBtn.forEach((btn) => {
    btn.addEventListener('click' , () => {
        window.location.reload()
    })
})











