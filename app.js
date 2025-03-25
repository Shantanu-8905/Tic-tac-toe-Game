let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  

// Storing win pattern
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.disabled = false;  
    newGameBtn.disabled = true; 
};

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

// Enable all boxes and clear them
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win-line"); // Remove any winning line effect
    });
};

// Show winner and highlight the winning combination
const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations! Winner is: ${winner}`;
    msgContainer.classList.remove("hide");
    highlightWinningPattern(pattern);
    disableBoxes();
    resetBtn.disabled = false;  
    newGameBtn.disabled = false;  
};

// Highlight the winning pattern
const highlightWinningPattern = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("win-line");
    });
};

// Check for a winner or draw
const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val && pos2Val && pos3Val) {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val, pattern);  
                return;
            }
        }
    }

    // Check for a draw (when all boxes are filled and there's no winner)
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        resetBtn.disabled = false;  
        newGameBtn.disabled = false;  
    }
};

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { 
            if (turnO) {
                box.innerText = "O";
                turnO = false;
            } else {
                box.innerText = "X";
                turnO = true;
            }

            box.disabled = true; 
            checkWinner();
        }
    });
});

// Event listener for new game
newGameBtn.addEventListener("click", resetGame);

// Event listener for reset button
resetBtn.addEventListener("click", resetGame);
