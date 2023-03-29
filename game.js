'use strict'

var gBoard
var gLevel
var gGame

// console.log(INPUT:)
// console.log(EXPECTED:)
// console.log(ACTUAL:)

function onInit() {
    console.log( buildBoard(4, 4))
}

function buildBoard(ROWS, COLS) {
    const board = []
    for (var i = 0; i < ROWS; i++) {
        board[i] = []
        for (var j = 0; j < COLS; j++) {
            board[i][j] = { type: FLOOR, gameElement: null }        }
        // board.push(row)
    }
    return board
}

function setMinesNegsCount(board) {

}

function renderBoard(board) {

}

function onCellClicked(elCell, i, j) {

}

function onCellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}


