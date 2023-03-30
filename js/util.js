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

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
  }

  function showElement(selector) {
    const el = document.querySelector(selector)
    el.classList.remove('hide')
}

function hideElement(selector) {
    const el = document.querySelector(selector)
    el.classList.add('hide')
}

function putStringAmountTimesInMat(MAT, STRING, AMOUNT) {     
    if (AMOUNT > MAT.length * MAT[0].length) return
    for (var i = 0; i < AMOUNT; i++) {
      var row = getRandomInt(0, MAT.length)
      var col = getRandomInt(0, MAT[0].length)
      if (MAT[row][col].isMine === STRING) {
        i--
      } else {
        MAT[row][col].isMine = true
      }
    }
  }

  function startTimer() {
    var startTime = Date.now()
    const elTimer = document.querySelector('.timer')
    gTimerIntervalId = setInterval(() => {
        const diff = Date.now() - startTime
        elTimer.innerText = (diff / 1000).toFixed(3)
    }, 10)
}
