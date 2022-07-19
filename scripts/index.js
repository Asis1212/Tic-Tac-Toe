const selectBox = document.querySelector(".select-box");
const playBoard = document.querySelector(".play-board");
const XchoiceBtn = document.querySelector(".playerX");
const OchoiceBtn = document.querySelector(".playerO");
const pcModeBtn = document.querySelector(".against-pc");
const firendModeBtn = document.querySelector(".against-firend");
const Xwins = document.querySelector(".Xwins .amount");
const Owins = document.querySelector(".Owins .amount");
const draws = document.querySelector(".draws .amount");
const boxes = document.querySelectorAll(".box");
const Xturn = document.querySelector(".Xturn");
const Oturn = document.querySelector(".Oturn");
const homeBtn = document.querySelector(".homeButton");
const resetBtn = document.querySelector(".resetButton")
const endGame = document.querySelector(".announcement");
const endGameHeader = document.querySelector(".announcement header");
const replayButton = document.querySelector(".replay");

let boxesGame = [];

// Define the game - start of the game
let firstStep, secondStep;
let mode;

XchoiceBtn.onclick = () => {
    defineGameDetails(XchoiceBtn, "X", "O");
    removeClassActive(OchoiceBtn);
    passToBoardPlay();
    changeActiveTurnFromTo(Oturn, Xturn);
}
OchoiceBtn.onclick = () => {
    defineGameDetails(OchoiceBtn, "O", "X");
    removeClassActive(XchoiceBtn);
    passToBoardPlay();
    changeActiveTurnFromTo(Xturn, Oturn);
}
pcModeBtn.onclick = () => {
    changeClassButton(pcModeBtn);
    mode = "PC";
    removeClassActive(firendModeBtn);
    passToBoardPlay();
}
firendModeBtn.onclick = () => {
    changeClassButton(firendModeBtn);
    mode = "Friend";
    removeClassActive(pcModeBtn);
    passToBoardPlay();
}

// Define the game's rules and properties
let numberOfWinsX, numberOfWinsO, numberOfDraws;
let pcNumber = 0;
let iconWin, gameOver, countOfClicks = 0;
let propertiesObject;

window.onload = () => {
    numberOfWinsX = initFromStorage("winOfX");
    numberOfWinsO = initFromStorage("winOfO");
    numberOfDraws = initFromStorage("draws");
    updateStatistics();
    if(localStorage.hasOwnProperty("gameHistory")) {
        propertiesObject = JSON.parse(localStorage.getItem("gameHistory"));
        if(!propertiesObject.statusGame) {
            continueGame();
        }
    }
}

// The game function
boxes.forEach((box) => {
    box.onclick = () => {
        if(mode === "Friend") {
            if(box.textContent === "") { 
                if(propertiesObject.turnGame === 1) {
                    box.textContent = firstStep;
                    propertiesObject.turnGame++;
                    changeActiveTurnFromTo(eval(firstStep+"turn"), eval(secondStep+"turn"));
                } else {
                    box.textContent = secondStep;
                    propertiesObject.turnGame--;
                    changeActiveTurnFromTo(eval(secondStep+"turn"), eval(firstStep+"turn"));
                }
                countOfClicks++;
            }
        } else {
            if(box.textContent === "") { 
                box.textContent = firstStep;
                countOfClicks++;
                changeActiveTurnFromTo(eval(firstStep+"turn"), eval(secondStep+"turn"));
                checkGameOver();
                if(countOfClicks < 9) {
                    setTimeout(() => {
                        pcNumber = Math.floor(Math.random() * 9);
                        while(boxes[pcNumber].textContent !== "") {
                            pcNumber = Math.floor(Math.random() * 9);
                        }
                        boxes[pcNumber].textContent = secondStep;
                        updateArray(true);
                        saveArrayInStorage();
                        changeActiveTurnFromTo(eval(secondStep+"turn"), eval(firstStep+"turn"));
                        countOfClicks++;
                        setTimeout(() => {
                            checkGameOver();
                        }, 400)
                    }, 1000);
                } else {
                    clearTimeout();
                }
            }
        }
        updateArray(true);
        checkGameOver();
        if(countOfClicks === 9 && !gameOver) {
            finishGame("Draws")
        }
    saveArrayInStorage();
    }
});

// Return to home page button
homeBtn.onclick = () => {
    propertiesObject.statusGame = true;
    saveArrayInStorage();
    defineForNewGame(playBoard)
}

// Reset the statistics 
resetBtn.onclick = () => {
    numberOfWinsX = 0;
    numberOfWinsO = 0;
    numberOfDraws = 0;
    saveOnStorage();
    onload();
}

// Define replay button
replayButton.onclick = () => {
    defineForNewGame(endGame);
}