const {
  reject,
  eqProps,
  curryN
} = require('ramda')

function remove (slot, slots) {
  return reject(eqProps('_id', slot), slots)
}

module.exports = curryN(2, remove)
