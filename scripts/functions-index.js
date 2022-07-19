const updateArray = (isFromTo) => {
    if(isFromTo) {
        for(let i=0; i<boxes.length; i++) {
            boxesGame[i]=boxes[i].textContent;
        }
    } else {
        for(let i=0; i<boxesGame.length; i++) {
            boxes[i].textContent=boxesGame[i];
        }
    }
}

const defineGameDetails = (button, stepOne, stepTwo) => {
    changeClassButton(button);
    firstStep = stepOne;
    secondStep = stepTwo;
}

const changeClassButton = (classButton) => {
    if(classButton.classList[1] === "btn") {
        classButton.classList.remove("btn");
        classButton.classList.add("focus");
    } else {
        classButton.classList.remove("focus");
        classButton.classList.add("btn");
    }
}

const removeClassActive = (classButton) => {
    if(classButton.classList[1] === "focus") {
        classButton.classList.remove("focus");
        classButton.classList.add("btn");
    }
}

const resetButtonsOnSelectPage = () => {
    removeClassActive(XchoiceBtn);
    removeClassActive(OchoiceBtn);
    removeClassActive(pcModeBtn);
    removeClassActive(firendModeBtn);
}

const passToBoardPlay = () => {
    if((XchoiceBtn.classList[1] === "focus" || OchoiceBtn.classList[1] === "focus") &&
     (pcModeBtn.classList[1] === "focus" || firendModeBtn.classList[1] === "focus")) {
        selectBox.classList.add("hide");
        playBoard.classList.remove("hide");
        gameOver = false;
        updateArray(true);
        propertiesObject = {
            statusGame: gameOver,
            stepOne: firstStep,
            stepTwo: secondStep,
            modeGame: mode,
            gameboxes: boxesGame,
            turnGame: 1
        }
        saveArrayInStorage();
    }
    
}

const continueGame = () => {
    gameOver = propertiesObject.statusGame;
    firstStep = propertiesObject.stepOne;
    secondStep = propertiesObject.stepTwo;
    mode = propertiesObject.modeGame;
    boxesGame = propertiesObject.gameboxes;
    if(propertiesObject.turnGame === 2) {
        changeActiveTurnFromTo(eval(firstStep+"turn"), eval(secondStep+"turn"));
    } else {
        changeActiveTurnFromTo(eval(secondStep+"turn"), eval(firstStep+"turn"));
    }
    updateArray(false);
    selectBox.classList.add("hide");
    playBoard.classList.remove("hide");
}

const changeActiveTurnFromTo = (from, to) => {
    if(to.classList[1] !== "active") {
        from.classList.remove("active");
        to.classList.add("active");
    }
}

const updateStatistics = () => {
    Xwins.textContent = `${numberOfWinsX} wins`;
    Owins.textContent = `${numberOfWinsO} wins`;
    draws.textContent = `${numberOfDraws} draws`;
}

const checkGameOver = () => {
    for(let i=0; i<3 && !gameOver; i++) {
        if(boxes[i].textContent !== "") {
            if(boxes[i+3].textContent === boxes[i].textContent && boxes[i+6].textContent === boxes[i].textContent) {
                iconWin = boxes[i].textContent;
                gameOver = true;
                finishGame("win");
            }
        }
    }
    for(let i=0; i<=6 && !gameOver; i+=3) {
        if(boxes[i].textContent !== "") {
            if(boxes[i+1].textContent === boxes[i].textContent && boxes[i+2].textContent === boxes[i].textContent) {
                iconWin = boxes[i].textContent;
                gameOver = true;
                finishGame("win");
            }
        }
    }
    for(let i=0; i<=2 && !gameOver; i+=2) {
        if(boxes[i].textContent !== "") {
            if(i === 0) {
                if(boxes[i+4].textContent === boxes[i].textContent && boxes[i+8].textContent === boxes[i].textContent) {
                    iconWin = boxes[i].textContent;
                    gameOver = true;
                    finishGame("win");
                }
            } else {
                if(boxes[i+2].textContent === boxes[i].textContent && boxes[i+4].textContent === boxes[i].textContent) {
                    iconWin = boxes[i].textContent;
                    gameOver = true;
                    finishGame("win");
                }
            }
        }
    }
}

const finishGame = (status) => {
    propertiesObject.statusGame = true;
    boxesGame = [];
    playBoard.classList.add("hide");
    endGame.classList.remove("hide");
    if (status === "win") {
        endGameHeader.textContent = `Player '${iconWin}' won the game!`;
        if(iconWin === "X") {
            numberOfWinsX++;
        } else {
            numberOfWinsO++;
        }
    } else {
        endGameHeader.textContent = `Match has been drawn!`;
        numberOfDraws++;
    }
    saveOnStorage();
}

const defineForNewGame = (pageToHide) => {
    pageToHide.classList.add("hide");
    selectBox.classList.remove("hide");
    boxes.forEach((box) => {
        box.textContent = "";
    });
    if(pageToHide === endGame) {
        updateStatistics();
    }
    resetButtonsOnSelectPage();
    firstStep = undefined;
    secondStep = undefined;
    mode = undefined;
    iconWin = undefined;
    gameOver = false;
    countOfClicks = 0;
}

const initFromStorage = (string) => {
    if(localStorage.hasOwnProperty(string)) {
        return localStorage.getItem(string);
    } else {
        return 0;
    }
}

const saveOnStorage = () => {
    localStorage.setItem("winOfX", numberOfWinsX);
    localStorage.setItem("winOfO", numberOfWinsO);
    localStorage.setItem("draws", numberOfDraws);
}

const saveArrayInStorage = () => {
    localStorage.setItem("gameHistory", JSON.stringify(propertiesObject));
}