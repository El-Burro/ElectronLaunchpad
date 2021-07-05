const { setPad } = require("../../launchpad/pad")
const { reset } = require("../../midi/midi")
const { createButton } = require("./gridButton")

let _container = null
let buttons = []

const addButton = btn => {
  buttons = [...buttons, btn]
  _container.appendChild(btn)
}

const generate = container => {
  _container = container

  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      const button = createButton(i, j)
      addButton(button)
    }
  }
}

const resetGrid = () => {
  reset()

  setPad(null)
}

module.exports = { generate, resetGrid }
