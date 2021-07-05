const { TouchBar } = require("electron")
const { TouchBarButton } = TouchBar
const { redLbl } = require("./labels")

let mainWindow
let touchbar

const setMainWindow = () => (mainWindow = BrowserWindow.getFocusedWindow())

const redTBB = new TouchBarButton({
  label: "Red",
  textColor: "#f2f2f2",
  backgroundColor: "#ff0000",
  click: () => {
    setMainWindow()
    createBar([esc, redLbl])
  }
})
const greenTBB = new TouchBarButton({
  label: "Green",
  textColor: "#f2f2f2",
  backgroundColor: "#00ff00",
  click: () => {
    setMainWindow()
    createBar([esc, redLbl])
    // if (mainWindow) mainWindow.webContents.send({ txt: "green" })
  }
})
const esc = new TouchBarButton({
  label: "X",
  textColor: "#000",
  backgroundColor: "#ff000020"
})

const createBar = items => {
  touchbar = new TouchBar({ items })
}

touchbar = createBar([redTBB, greenTBB])

module.exports = { touchbar } //{ baseTb, redTb, greenTb }
