const {
  mapButtonIdToNote,
  mapNoteToButtonId,
  convertToHex
} = require("../utils/utils")
const { setPad, pad } = require("../launchpad/pad")
const { getElement } = require("../utils/selector")

let midi
let data
let portID = ""
let midiEnabled = false
let isFlashingOn = false
let valueOn = 0x0f

const onMIDISuccess = midiAccess => {
  midiEnabled = true
  midi = midiAccess
  listInputsAndOutputs(midi)
  var inputs = midi.inputs.values()
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = onMIDIMessage
  }
}

const onMIDIFailure = error => {
  midiEnabled = false
  console.error("No access to MIDI devices " + error)
}

const enableMidi = () => {
  if (navigator.requestMIDIAccess) {
    navigator
      .requestMIDIAccess({
        sysex: false
      })
      .then(onMIDISuccess, onMIDIFailure)
  } else {
    alert("No MIDI support in your browser.")
  }
}
const togglePad = (_pad, button, note) => {
  if (isFlashingOn) {
    send([0xb0, 0x00, 0x28])
    valueOn = 0x0b
  } else {
    send([0xb0, 0x00, 0x27])
    valueOn = 0x0f
  }
  if (_pad) {
    send([0x90, mapButtonIdToNote(_pad.id), 0x0c])
    _pad.id !== button.id && send([0x90, note, valueOn])
  } else {
    send([0x90, note, valueOn])
  }
}
const selectButton = data => {
  const note = `0x${data.note}`
  const buttonId = mapNoteToButtonId(note)
  const button = getElement(buttonId)
  const _pad = pad.selected

  if (data.velocity === 0) return

  togglePad(_pad, button, note)
  setPad(button)
}

const onMIDIMessage = message => {
  const msg = message.data
  data = {
    command: `0x${msg[0].toString(16)}`,
    note: convertToHex(msg[1]),
    velocity: +msg[2]
  }
  selectButton(data)
}

const listInputsAndOutputs = midiAccess => {
  for (var entry of midiAccess.inputs) {
    var input = entry[1]
    console.info(
      `Input port [type:' ${input.type}'] id:' ${input.id}' manufacturer:' ${input.manufacturer}' name:' ${input.name}' version:' ${input.version}'`
    )
  }

  for (var entry of midiAccess.outputs) {
    var output = entry[1]
    portID = output.id
    console.info(
      `Output port [type: ${output.type}] id: ${output.id} manufacturer: ${output.manufacturer} name: ${output.name} version: ${output.version}`
    )
  }
}

const setFlashLight = (value, pad) => {
  var noteOnMessage = [0xb0, 0x00, 0x28]
  var output = midi.outputs.get(portID)
  output.send(noteOnMessage)
}

const padLight = (value, pad) => {
  const noteOnMessage = [0x90, pad, value]
  const output = midi.outputs.get(portID)
  output.send(noteOnMessage)
}

const padLightOn = pad => padLight(0x1f, pad)

const padLightOff = pad => padLight(0x0c, pad)

const send = msg => {
  if (!portID || !midiEnabled) enableMidi()

  const output = midi.outputs.get(portID)
  output.send(msg)
}

const reset = () => send([0xb0, 0x00, 0x00])

module.exports = {
  enableMidi,
  send,
  reset,
  padLight,
  padLightOn,
  padLightOff
}
