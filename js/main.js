'use strict'

// console.log(INPUT:)
// console.log(EXPECTED:)
// console.log(ACTUAL:)

const FLAG = '🚩'
const MINE = '💣'
var gBoard
var gTimerIntervalId

var gLevel = {
    easy: {
        SIZE: 4,
        MINES: 2,
    },
    medium: {
        SIZE: 8,
        MINES: 14,
    },
    hard: {
        SIZE: 12,
        MINES: 32,
    },
}
var gGame
var gLivesCount = 2
var gNeighborsMineCount
var isFirstClick = true

// BEGINS THE GAME RUNNING FEATURES
function onInIt(gameLevel) {

    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        gameLevel: gameLevel,
        isVictory: false
    }
    // STRARTING AT LEVEL: EASY UNLESS CHOSEN DIIFFRENTLEY   
    if (!gameLevel) {
        gGame.gameLevel = 'easy'
    }

    handleRightClick()
    gBoard = buildBoard()
    renderBoard(gBoard, '.board')
    setLivesCount(gLivesCount)
    hideElement('.victory-container')
    hideElement('.defeat-container')
}

// CREATES THE MODEL OF THE GAME BOARD AND IT'S INNER OBJECTS
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel[gGame.gameLevel].SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel[gGame.gameLevel].SIZE; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

// RUNS THROUGH NEIGHBOURS OF TARGET CELL AND COUNTS IF THEY ARE MINES 
function setMinesNegsCount(BOARD, ROW, COL, isShowNonMines) {
    gNeighborsMineCount = 0
    for (var i = ROW - 1; i <= ROW + 1; i++) {
        if (i < 0 || i > BOARD.length - 1) continue
        for (var j = COL - 1; j <= COL + 1; j++) {
            if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
            if (BOARD[i][j].isMine) {
                gNeighborsMineCount++
            } else {
                if (isShowNonMines) {                                //EXPOSING CELLS WHO ARE NOT MINES
                    var elCell = document.querySelector(`.cell-hidden.cell-${i}-${j}`)
                    elCell.classList.add('hide')
                    gBoard[i][j].isShown = true
                }
            }
        }
    }
    return gNeighborsMineCount
}

// TURNS THE GAME BOARD MODEL AND IT'S OBJECTS INTO VISUAL ELEMNTS IN THE BROWSER (THE DOM)
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j })
            strHTML += `
                <td class="cell-container"  onclick="onCellClicked(${i},${j})">
                    <div  class="cell ${cellClass}">
                        ${currCell.isMine ? MINE : currCell.minesAroundCount}
                        </div>
                    <div class="cell-hidden ${cellClass} ${currCell.isMine ? 'mine' : ''} ${currCell.isShown ? 'hide' : ''}">
                        <div class="flag hide ${cellClass} ">${FLAG}</div>
                    </div> `
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

// HANDLING THE EFFECTS OF CLICKING THE BOARD
function onCellClicked(i, j) {

    if (!gGame.isOn) {
        return
    }                    ////RAGARDING THE FIRST CLICK OF EACH GAME
    if (isFirstClick) {
        startTimer()
        putMinesInBoard(gBoard, gLevel[gGame.gameLevel].MINES, i, j)
        setCellValue(gBoard)
        renderBoard(gBoard, '.board')
        isFirstClick = false
    }
    gBoard[i][j].isShown = true
    var elHiddenCell = document.querySelector(`.cell-hidden.cell-${i}-${j}`)
    elHiddenCell.classList.add('hide')
    if (!gBoard[i][j].isMine) {
        expandShown(gBoard, i, j)
    }


    ////  WHEN A MINE IS CLICKED

    if (gBoard[i][j].isMine) {
        gLivesCount--
        setLivesCount(gLivesCount)
        if (gLivesCount === 0) {                                  /// AND THERE ARE NO MORE LIVES LEFT       
            var elMineCells = document.querySelectorAll(`.mine`)
            for (var i = 0; i < elMineCells.length; i++) {
                elMineCells[i].classList.add('hide')             ////EXPOSE THE REMAINING MINES      
            }
            showElement('.defeat-container')                     /// TELL THE USER HE LOST
            clearInterval(gTimerIntervalId)                      /// RESET TIMER
            gGame.isOn = false                                   /// STOP THE GAME

            var elButton = document.querySelector('.restart-btn') /// TURN THE RESTART BUTTON ICON TO 'MIND FUCKED'
            elButton.innerText = '🤯'
        } else {                                               // IF MORE LIVES LEFT, CHANGE THE MOD ACCORDINGLEY
            gBoard[i][j].isMarked = true
            gBoard[i][j].isShown = true


            // RENDER THE DOM
            var elHiddenCell = document.querySelector(`.cell-hidden.cell-${i}-${j}`)
            elHiddenCell.classList.add('hide')

        }
    }                                                            //CHECKING IF USER WON              
    isVictory(gBoard)
    if (gGame.isVictory) {
        gGame.isOn = false
        var elButton = document.querySelector('.restart-btn')    //TURN THE RESTART BUTTON TO WINNER ICON
        elButton.innerText = '😎'
        showElement('.victory-container')                       ///TELL THE USER HE WON
        clearInterval(gTimerIntervalId)                         // REST THE TIMER
        return;
    }

}

// HANDLING THE CHANGE LEVEL BUTTON CLICKING
function onChangeLevel(level) {
    isFirstClick = true                                        // IF NO BUTTON WAS CLICKED
    var elButton = document.querySelector('.restart-btn')
    elButton.innerText = '😄'                                 // KEEP A HAPPY FACE ON BUTTON
    gLivesCount = 2                                           // RESET LIVES COUNTER
    clearInterval(gTimerIntervalId)                           // RESET THE TIMER
    restartTimer()
    hideElement('.defeat-container')
    onInIt(level)                                             // MAKE THE GAME START
}

// RESTARTS THE TIMER
function restartTimer() {
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = '0'
}

// HANDLES THE EFFECTS OF MARKING(RIGHT CLICKING) A CELL
function onCellMarked(elCell) {
    const cell = gBoard[i][j]
    if (cell.isShown || cell.isMarked) return                // IF IT'S ALREADY MARKED OR EXPOSED MAKE NO EFFECT
    elCell.isMarked = true
}

// EXPOSING THE EMPTY CELLS AROUND THE TARGET CELL

function expandShown(board, i, j) {
    setMinesNegsCount(board, i, j, true)
}

// WHAT COMES INTO EFFECT WHEN THE RESTART GAME BUTTON IS CLICKED
function onRestartGame() {
    hideElement('.victory-container')
    hideElement('.defeat-container')
    clearInterval(gTimerIntervalId)
    restartTimer()
    isFirstClick = true;
    var elButton = document.querySelector('.restart-btn')
    elButton.innerText = '😄'
    gLivesCount = 2
    onInIt(gGame.gameLevel)
}

// CREATES A NUMERIC VALUE OF A CELL ACCORDING TO IT'S NEIGHBOURING CELL'S CONTENT
function setCellValue(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (gBoard[i][j].isMine) {
                continue
            }
            var minesAroundCount = setMinesNegsCount(board, i, j, false)
            gBoard[i][j].minesAroundCount = minesAroundCount
        }
    }
}

// CHECKING IF ALL THE EMPTY CELLS WERE EXPOSED BY THE USER  AND ALL BOMBS WERE MARKED (WINNING CONDITIONS)
function isVictory(board) {
    const totalSafeCells = gLevel[gGame.gameLevel].SIZE ** 2 - gLevel[gGame.gameLevel].MINES
    var cellsCounter = 0
    var markedMinesCounter = 0

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isShown && !board[i][j].isMine) {
                cellsCounter++
            }
            if (board[i][j].isMine && board[i][j].isMarked) {
                markedMinesCounter++
            }
        }
    }
    if (cellsCounter === totalSafeCells &&
        markedMinesCounter === gLevel[gGame.gameLevel].MINES && gLivesCount > 0) {
        gGame.isVictory = true
    }
}
//// RANDOMMLEY PUTTING MINES ON BOARD WITH CONDITIONS
function putMinesInBoard(board, AMOUNT, firstClickI, firstClickJ) {
    if (AMOUNT > board.length * board[0].length) return
    for (var i = 0; i < AMOUNT; i++) {
        var row = getRandomInt(0, board.length)
        var col = getRandomInt(0, board[0].length)
        //MAKE SURE FIRST CLICK IS NOT MATCHING RANDOM BOMB LOCATION
        if (firstClickI === row && firstClickJ === col) {
            i--
            continue
        } else {
            board[row][col].isMine = true
        }
    }
}

// UPDATES THE COUNTER OF REMAINING LIVES FOR USER
function setLivesCount(lives) {
    const elCountLives = document.querySelector('.lives')
    elCountLives.innerText = lives + '💗' + 'REMAINING'
}
