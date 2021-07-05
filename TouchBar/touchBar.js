const { BrowserWindow, TouchBar } = require("electron")
const {
  TouchBarButton,
  TouchBarColorPicker,
  TouchBarScrubber,
  TouchBarSpacer
} = TouchBar
const { redLbl, greenLbl, blueLbl } = require("./labels")

let mainWindow
let touchbar
const pickerColors = [
  "#000000",
  "#660000",
  "#aa0000",
  "#ff0000",
  "#006600",
  "#00aa00",
  "#00ff00",
  "#666600",
  "#aa6600",
  "#ff6600",
  "#66aa00",
  "#66ff00",
  "#aaaa00",
  "#aaff00",
  "#ffaa00",
  "#ffff00"
]

const scrubItems = [
  { label: "red" },
  { label: "orange" },
  { label: "yellow" },
  { label: "amber" },
  { label: "green" },
]

const setMainWindow = () => (mainWindow = BrowserWindow.getFocusedWindow())

const createBar = items => {
  if (BrowserWindow.getAllWindows().length !== 0 && mainWindow) {
    if (!items || items.length < 1) touchbar = new TouchBar(baseTB)
    else touchbar = new TouchBar({ items })
    mainWindow.setTouchBar(touchbar)
  } else {
    setMainWindow()
  }
}

const redTBB = new TouchBarButton({
  label: "Red",
  textColor: "#f2f2f2",
  backgroundColor: "#ff0000",
  click: () => {
    setMainWindow()
    createBar([escTBB, redLbl])

    if (mainWindow) mainWindow.webContents.send("msg", "red")
  }
})

const greenTBB = new TouchBarButton({
  label: "Green",
  textColor: "#f2f2f2",
  backgroundColor: "#00ff00",
  click: () => {
    setMainWindow()
    createBar([escTBB, greenLbl])

    if (mainWindow) mainWindow.webContents.send("msg", { color: "green" })
  }
})

const sendMsg = (msg, e) => {
  setMainWindow()
  if (mainWindow) mainWindow.webContents.send("msg", { msg, e })
}

const scrubTBB = new TouchBarScrubber({
  items: scrubItems,
  continuous: false,
  overlayStyle: "outline",
  select: i => {
    i && i > 0 && sendMsg("select", scrubItems[i].label)
  }
})

const escTBB = new TouchBarButton({
  label: "X",
  textColor: "#000",
  backgroundColor: "#fff",
  click: () => {
    setMainWindow()
    createBar(baseTB)

    if (mainWindow) mainWindow.webContents.send("msg", "escape")
  }
})

const baseTB = [
  redTBB,
  greenTBB,
  new TouchBarSpacer({
    size: "large"
  }),
  scrubTBB,
  new TouchBarSpacer({
    size: "large"
  }),
  picker
]
if (!touchbar) touchbar = new TouchBar({ items: baseTB })

module.exports = { touchbar }
