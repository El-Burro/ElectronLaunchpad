const stripHex = data => {
  if (data.match(/^[0-9a-fA-F]{2}$/)) return data
  if (data.match(/^0x[0-9a-fA-F]{2}$/)) return data.substr(2)
  throw "Invalid hex code"
}

const mapNoteToButtonId = data => {
  const note = stripHex(`${data}`)
  const row = +(note.length === 1 ? 0 : note.substr(0, 1)) + 1
  const col = note.substr(note.length === 1 ? 0 : 1, 1)

  return `#btn-${row}-${col}`
}

const mapButtonIdToNote = id => {
  const splitId = id.split("-")
  return `0x${+splitId[1] - 1}${+splitId[2]}`
}

const createColor = (red, green, flag = 12) =>
  Number(green) * 16 + Number(red) + Number(flag)

const convertToHex = dec => `${dec < 16 ? "0" : ""}${dec.toString(16)}`

module.exports = {
  convertToHex,
  mapNoteToButtonId,
  mapButtonIdToNote,
  createColor
}
