'use strict'


// console.log(INPUT:)
// console.log(EXPECTED:)
// console.log(ACTUAL:)

const MINE = '💣'
var gBoard
var gTimerIntervalId

var gCell = {                            ///////
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame
var gLivesCount = 3
var gNeighborsMineCount

function onInIt() {
    startTimer()
    var gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    if(gGame.isOn === false) return

    gBoard = buildBoard()
    renderBoard(gBoard, '.board')
     putStringAmountTimesInMat(gBoard,'💣', gLevel.MINES)
    renderBoard(gBoard, '.board')

    setCellValue(gBoard)
    hideElement('.victory-container')
}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: null,            
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
   // board[1][1].isMine = true
   // board[0][0].isMine = true
    return board
}

function setMinesNegsCount(BOARD, ROW, COL) {
    gNeighborsMineCount = 0
    for (var i = ROW - 1; i <= ROW + 1; i++) {
        if (i < 0 || i > BOARD.length - 1) continue
        for (var j = COL - 1; j <= COL + 1; j++) {
            if (j < 0 || j > BOARD[i].length - 1 || (i === ROW && j === COL)) continue
            if (BOARD[i][j].isMine) gNeighborsMineCount++
        }
    }
    return gNeighborsMineCount
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({ i, j })
            strHTML += `
                <td class="cell-container"  onclick="onCellClicked(this,${i},${j})">
                    <div  class="cell ${cellClass}">
                        ${currCell.isMine ? MINE : ''}
                        </div>
                    <div class="cell-hidden  ${cellClass}"></div> ` 
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    elCell.isShown = true
    var elHiddenCell = document.querySelector(`.cell-hidden.cell-${i}-${j}`)
    elHiddenCell.classList.add('hide')
    setMinesNegsCount(gBoard, i, j)
    if (gBoard[i][j].isMine)
    // countLives(gLivesCount)                    NOT WORKING !!!!
    checkGameOver() 
}

function onChangeLevel(level) {
    gLevel.SIZE = level
    gLevel.MINES = level / 2 + level
    onInIt()
}

function checkGameOver() {
    if( isVictory())  {
        showElement('.victory-container')
    } else {
        showElement('.defeat-container')
        console.log('Game Over')
    }
    clearInterval(gTimerIntervalId)
    // gGame.isOn = false                       NOT WORKING!!!!!
}

function restartTimer() {
    const elTimer = document.querySelector('.timer')
    elTimer.innerText = '0'
}

function onCellMarked(elCell) {
    const cell = gBoard[i][j]
    if (cell.isShown || cell.isMarked) return
    console.log('Cell clicked: ', elCell, i, j)
    elCell.isMarked = true
    // if(gBoard[i][j].isMine === true)               
}

function expandShown(board, elCell, i, j) {

}

function onRestartGame() {
    hideElement('.victory-container')
    restartTimer()
    onInIt()
}

function setCellValue(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (gBoard[i][j].isMine) {
                continue
            }
            var minesAroundCount = setMinesNegsCount(board, i ,j)
            gBoard[i][j].minesAroundCount = minesAroundCount
            document.querySelector(`.cell.cell-${i}-${j}`).innerText = minesAroundCount
        }
    }

}

function isVictory() {

}

function countLives(lives) {
    const elCountLives = document.querySelector('.lives')
    elCountLives.innerText = lives
}

function smile() {
    const elSmileBtn = document.querySelector('.smiley-btn')
    elSmileBtn.innerHTML = '&#9786;';
}

// Gets a string such as: 'cell-2-7' and returns {i:2, j:7}
// function getCellCoord(strCellId) {
//     const coord = {}
//     const parts = strCellId.split('-')
//     coord.i = +parts[1]
//     coord.j = +parts[2]
//     return coord
//   }

 

// function getAmountOfCellsContaining(BOARD, ITEM) {            gBoard,MINE   count
//     var amount = 0
//     for (var i = 0; i < BOARD.length; i++) {
//       for (var j = 0; j < BOARD[i].length; j++) {
//         if (BOARD[i][j] === ITEM) amount++
//       }
//     }
//     return amount
//   }
