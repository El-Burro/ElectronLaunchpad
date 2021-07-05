const { TouchBar } = require("electron")
const { TouchBarLabel } = TouchBar

const redLbl = new TouchBarLabel({
  label: "red",
  textColor: "#ff0000"
})
const greenLbl = new TouchBarLabel({
  label: "green",
  textColor: "#00ff00",
})
const blueLbl = new TouchBarLabel({
  label: "blue",
  textColor: "#0000ff"
})

module.exports = { redLbl, greenLbl, blueLbl }
