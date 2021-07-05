const COLOR = {
  R0G0: 12,
  R1G0: 13,
  R2G0: 14,
  R3G0: 15,
  R0G1: 28,
  R1G1: 29,
  R2G1: 30,
  R3G1: 31,
  R0G2: 44,
  R1G2: 45,
  R2G2: 46,
  R3G2: 47,
  R0G3: 60,
  R1G3: 61,
  R2G3: 62,
  R3G3: 63
}
const off = COLOR.R0G0
const red = COLOR.R3G0
const green = COLOR.R0G3
const yellow = COLOR.R3G3
const orange = COLOR.R3G1
const amber = COLOR.R2G2

module.exports = { COLOR, off, red, green, yellow, orange, amber }
