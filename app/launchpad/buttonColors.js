let btn = null

const createLinear = (angle, val) =>
  `linear-gradient(${angle}deg, transparent 4px, ${val} 4px)`

const getBackground = (id, val) => {
  switch (id) {
    case "btn-3-3":
      return createLinear(-45, val)
    case "btn-3-4":
      return createLinear(45, val)
    case "btn-4-3":
      return createLinear(-135, val)
    case "btn-4-4":
      return createLinear(135, val)
    default:
      return val
  }
}

const changeColor = e => {
  const val = e.target.value
  btn.style.background = getBackground(btn.id, val)
}

const toggleColorSelect = (enabled, button) => {
  // const colorSelect = getElement("#input-color")

  btn = button
  // colorSelect.disabled = !enabled
  // enabled
  //   ? colorSelect.addEventListener("change", changeColor)
  //   : colorSelect.removeEventListener("change", changeColor)
}

module.exports = {toggleColorSelect}
