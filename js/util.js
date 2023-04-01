'use strict'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

function getClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

function showElement(selector) {
  const el = document.querySelector(selector)
  el.classList.remove('hide')
}

function hideElement(selector) {
  const el = document.querySelector(selector)
  el.classList.add('hide')
}

function startTimer() {
  var startTime = Date.now()
  const elTimer = document.querySelector('.timer')
  gTimerIntervalId = setInterval(() => {
    const diff = Date.now() - startTime
    elTimer.innerText = (diff / 1000).toFixed(0)
  }, 10)
}

function handleRightClick() {
  window.oncontextmenu = function (e) {                       //THE EVENT WHEN MOUSE IS RIGIHT CLICKED
    e.preventDefault();                                       // PREVENT MENU OPENING
    // console.log(e.target.classList[1])
     if (e.target.classList[1]) {                             // CATCH THE TARGET ELEMENT LOCATION, classlist = [cell, cell-0-1]
      var elClass = e.target.classList[1]
      const classes = elClass.split('-')                       // cell-0-1 split('-') --> [cell,0,1]             
      var i  = classes[1]
      var j = classes[2]
  
      var elCellFlag = document.querySelector('.flag'+'.' + elClass)  //CATCH FLAG CLASS OF TARGET CELL
     
     if(gBoard[i][j].isMarked) {                                     // SUPPORT FOR 2ND CLICK REMOVE FLAG
      gBoard[i][j].isMarked = false
      elCellFlag.classList.add('hide')
      return
     }                                                               //RENDER THE DOM ACCORDINGLEY
  
     gBoard[i][j].isMarked = true
     
     elCellFlag.classList.remove('hide')
     }

     isVictory(gBoard)                                          // SUPPORT WINNING BY FLAG MARK
     if (gGame.isVictory) {
      gGame.isOn = false;
            var elButton = document.querySelector('.restart-btn')
            elButton.innerText ='😎'

            showElement('.victory-container')
            clearInterval(gTimerIntervalId)
 
     }
  }
}
