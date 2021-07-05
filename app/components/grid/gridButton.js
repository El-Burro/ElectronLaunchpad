const { setPad, pad } = require("../../launchpad/pad")
const { send, reset } = require("../../midi/midi")
const { mapButtonIdToNote } = require("../../utils/utils")

const utfCode = ["▲", "▼", "◀", "▶︎", "session", "user 1", "user 2", "mixer"]

const createButton = (i, j) => {
  if (i === 0 && j === 8) return document.createElement("div")

  const btn = document.createElement("button")
  btn.id = `btn-${i}-${j}`
  btn.classList.add("btn")
  btn.addEventListener("click", e => handleButtonSelection(e.target))

  if (i === 0 || j === 8) {
    btn.classList.add("round")
    btn.innerHTML = i === 0 ? utfCode[j] : j === 8 && "▷"
  }

  return btn
}

const togglePad = (_pad, button, note) => {
  if (_pad) {
    send([0x90, mapButtonIdToNote(_pad.id), 0x0c])
    _pad.id !== button.id && send([0x90, note, 0x0f])
  } else {
    send([0x90, note, 0x0f])
  }
}


const handleButtonSelection = button => {
  const _pad = pad.selected
  const note = mapButtonIdToNote(button.id)
  reset()
  togglePad(_pad, button, note)

  setPad(button)
}

module.exports = { createButton, handleButtonSelection }
