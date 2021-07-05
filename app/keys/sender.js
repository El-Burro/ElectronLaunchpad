const { ipcRenderer } = require("electron")
const { getElement } = require("../utils/selector")

const sendKey = () => {
  const sendButton = getElement("#key-test")
  sendButton.addEventListener("click", e => {
    console.log(e)
  })
}

const experiment = () => {
  console.log("exp")
  const slider = document.getElementById("myRange")
  ipcRenderer.on("slider", (event, message) => {
    slider.value = message
    console.log(message)
  })
  ipcRenderer.on("msg", (event, message) => {
    console.log(message)
  })
}

module.exports = { experiment, sendKey }
