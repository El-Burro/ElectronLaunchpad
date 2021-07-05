const { send, reset } = require("../midi/midi")
const c = require("../launchpad/padColor")
const { getElements } = require("../utils/selector")

let interval
// d = [...d, c.red, c.orange, c.off, c.green, c.amber, c.COLOR.R1G2, c.red, c.yellow]

const empty = (n, arr) => {
  for (i = 0; i < n; i++) {
    arr = [...arr, c.off]
  }
  return arr
}

const squares = () => {
  let d = []
  for (a = 0; a < 2; a++) {
    for (b = 0; b < 8; b++) {
      d =
        b === 0 || b === 1 || b === 6 || b === 7
          ? [...d, c.red, c.yellow, c.yellow, c.red]
          : [...d, c.green, c.orange, c.orange, c.green]
    }
  }
  return d
}

const makeDiagonal = (c1, c2 = c.off, type = "X") => {
  let d = []
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (type === "LR") d = i === j ? [...d, c1] : [...d, c2]
      if (type === "RL") d = i + j === 7 ? [...d, c1] : [...d, c2]
      if (type === "X") d = i === j || i + j === 7 ? [...d, c1] : [...d, c2]
    }
  }
  return d
}
const special = inverted => {
  let c1 = inverted ? c.red : c.off
  let c2 = inverted ? c.off : c.green
  let d = []
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (i === 0 || i === 3 || i === 4 || i === 7) d = [...d, c1]
      else if (j === 0 || j === 3 || j === 4 || j === 7) d = [...d, c1]
      else d = [...d, c2]
    }
  }
  d[27] = d[28] = d[35] = d[36] = c2
  return d
}
const run = (m, n) => {
  let d = []
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      let color = c.yellow
      if (i % 2 === 0) color = c.red
      else if (j % 2 === 0) color = c.green
      if (i === n && j === m) d = [...d, color]
      else d = [...d, c.off]
    }
  }
  return d
}

// const generatePreset = (id, invert) => {
const generatePreset = (id, i, j) => {
  switch (id) {
    case 1:
      return makeDiagonal(c.red, c.COLOR.R0G1, "RL")
    case 2:
      return squares()
    case 3:
      return run(i, j)
    // return special(invert)
  }
}
const sendPresetMsgs = p => {
  let splitX = []
  for (i = 0; i < p.length; i += 2) {
    const s = p.slice(i, i + 2)
    splitX = [...splitX, s]
  }
  reset()
  splitX.map(m => send([146, ...m]))
}
// const animate = id => {
//   let invert = false
//   interval = setInterval(() => {
//     sendPresetMsgs(generatePreset(Number(id), invert))
//     invert = !invert
//   }, 500)
// }
const animate = id => {
  let i = 0
  let j = 0
  interval = setInterval(() => {
    sendPresetMsgs(generatePreset(Number(id), i, j))
    if (i < 8) i++
    else {
      i = 0
      if (j < 8) j++
      else j = 0
    }
  }, 250)
}
const sendPreset = id => {
  interval && clearInterval(interval)
  const pId = id.substr(id.indexOf("-") + 1, 1)
  if (+pId !== 3) {
    const p = generatePreset(Number(pId))
    if (p) sendPresetMsgs(p)
  } else animate(pId)
}

const presets = () => {
  const presets = getElements(".presets-container button")

  presets.forEach(p => {
    p.addEventListener("click", e => sendPreset(e.target.id))
  })
}

module.exports = presets
