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



function onInIt() {
    var gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard()
    // console.log('gboard', gBoard)
    renderBoard(gBoard, '.board')

}

function buildBoard() {
    const board = []

    for (var i = 0; i < 4; i++) {
        board[i] = []
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            // console.log('gCell', gCell)
        }
    }
    board[1][1].isMine = true
    board[0][0].isMine = true
    renderCell(board[1][1], MINE)

    return board
}

function renderBoard(board) {

    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i, j }) // 'cell-1-4'

            strHTML += `<td class="cell ${cellClass}"  onclick="onMoveTo(${i},${j})" >`

            // if (currCell.isMine === true) {
            //     strHTML += MINE
        // }
                strHTML += '</td>'
            }
            strHTML += '</tr>'
        }
        const elBoard = document.querySelector('.board')
        elBoard.innerHTML = strHTML
    }

    function renderCell(location, value) {
        // Select the elCell and set the value
        const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
        elCell.innerHTML = value
    }


    function getClassName(location) {
        const cellClass = 'cell-' + location.i + '-' + location.j
        return cellClass
    }



