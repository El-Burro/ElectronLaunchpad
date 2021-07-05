const { TouchBar } = require("electron")
const { TouchBarSlider } = TouchBar

const slider = new TouchBarSlider({
  label: "Simple slider",
  value: 10, // initial value
  minValue: 0,
  maxValue: 100,
  change: value => {
    setMainWindow()
    if (mainWindow) mainWindow.webContents.send("slider", value)
  }
})

module.exports = { slider }
