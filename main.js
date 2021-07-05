const {
  app,
  BrowserWindow,
  screen,
  globalShortcut
} = require("electron")
const path = require("path")
const { touchbar } = require("./TouchBar/touchBar")
// const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

let mainWindow

try {
  require("electron-reloader")(module)
} catch (_) {}

const createWindow = () => {
  const displays = screen.getAllDisplays()
  const mainDisplay = displays.find(
    display => display.bounds.x === 0 && display.bounds.y === 0
  )
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    x: mainDisplay.bounds.width - 1200,
    y: mainDisplay.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile("index.html")
  mainWindow.webContents.openDevTools()
    mainWindow.setTouchBar(touchbar)
}

app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.badgeCount = 3

  // const ret = globalShortcut.register("CommandOrControl+X", () => {
  //   console.log("CommandOrControl+X is pressed")
  // })

  // if (!ret) console.log("registration failed")

  // console.log(globalShortcut.isRegistered("CommandOrControl+X"))
})

app.on("will-quit", () => {
  globalShortcut.unregisterAll()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
