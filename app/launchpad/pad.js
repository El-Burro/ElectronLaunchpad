const { getElement } = require("../utils/selector")

const hl = "highlighted"

let pad = {}

Object.defineProperty(pad, "selected", {
  get: () => this.selected,
  set: pad => (this.selected = pad)
})

const setInputSpan = id =>
  (getElement("span#button-id").innerHTML = id || "no button selected")

const setPad = newPad => {
  const classes = newPad?.classList
  const _classes = pad.selected?.classList

  if (newPad === null && pad.selected) {
    setInputSpan()

    if (_classes && _classes.contains(hl)) _classes.remove(hl)
    return
  }

  if (classes) classes.contains(hl) ? classes.remove(hl) : classes.add(hl)

  setInputSpan(newPad?.id)

  pad.selected?.id !== newPad.id &&
    _classes &&
    _classes.contains(hl) &&
    _classes.remove(hl)

  pad.selected = pad.selected !== newPad ? newPad : undefined
}

module.exports = { pad, setPad, hl }
