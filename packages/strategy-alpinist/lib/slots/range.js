const {
  prop,
  slice,
  sortBy
} = require('ramda')

const sorted = sortBy(prop('price'))

function range (min, max, slots) {
  return slice(min, max, sorted(slots))
}

module.exports = range
