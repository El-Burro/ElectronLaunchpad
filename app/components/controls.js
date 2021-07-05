const { getElement, getElements } = require("../utils/selector")
const { send, padLight } = require("../midi/midi")
const { mapButtonIdToNote, createColor } = require("../utils/utils")
const { resetGrid } = require("./grid/grid")

let green = 0
let red = 0
let flag = 12 // use 8 for flashing
let color = 0

const buildMessage = pad => {
  const padId = mapButtonIdToNote(pad.id)

  color = createColor(red, green, flag)
  const msg = [0x90, padId, color]
  send(msg)
}

const controls = () => {
  const resetAll = getElement("#reset-all")
  const pcRed = getElement("#pad-color-red")
  const pcGreen = getElement("#pad-color-green")

  pcRed.addEventListener("change", e => {
    const pad = getElement(".highlighted")
    if (pad) {
      red = +e.target.value
      buildMessage(pad)
    }
  })

  pcGreen.addEventListener("change", e => {
    const pad = getElement(".highlighted")
    if (pad) {
      green = +e.target.value
      buildMessage(pad)
    }
  })

  resetAll.addEventListener("click", () => resetGrid())

  const LightOnAllPads = () => {
    color = createColor(red, green, flag)

    const btns = getElements(".btn")
    btns.forEach(b => {
      const pad = mapButtonIdToNote(b.id)
      padLight(color, pad)
    })
  }
}

module.exports = controls
