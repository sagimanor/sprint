'use strict'


// console.log(INPUT:)
// console.log(EXPECTED:)
// console.log(ACTUAL:)

const MINE = '💣'
var gBoard

var gCell = {
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
var gNeighborsMineCount 

function onInIt() {
    var gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    renderBoard(gBoard, '.board')
    hideElement('.victory-container')
}

function buildBoard() {
    const board = []
    for (var i = 0; i < 4; i++) {
        board[i] = []
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            // console.log('gCell', gCell)
        }
    }
    board[1][1].isMine = true
    board[0][0].isMine = true

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
            strHTML += `<td class="cell ${cellClass}"  onclick="oncellClicked(elCell,${i},${j})" >`
            if (currCell.isMine === true) {
                strHTML += MINE
            }
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    gCell.isShown = true
    elCell.classList.add('clicked')
    setMinesNegsCount(gBoard, i, j)

    if (BOARD[i][j].isMine) {
        checkGameOver()
    } else {
        //reveals the minesAroundCount
    }
}

function checkGameOver() {
    console.log('Game Over')
    gGame.isOn = false
}



