const { generate } = require("./app/components/grid/grid")
const { getElement } = require("./app/utils/selector")
const { enableMidi } = require("./app/midi/midi")
const controls = require("./app/components/controls")
const presets = require("./app/launchpad/presets")
const { experiment, sendKey } = require("./app/keys/sender")

window.addEventListener("DOMContentLoaded", () => {
  const container = getElement(".btn-grid-container")

  enableMidi()

  presets()
  generate(container)
  sendKey()
  controls()

  experiment()
})
