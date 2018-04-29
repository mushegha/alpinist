const {
  lensProp,
  view,
  filter,
  sortBy
} = require('ramda')

const {
  inRange,
  lensSatisfies,
} = require('ramda-adjunct')

const priceLens = lensProp('price')

function range (min, max, slots) {
  const isCovered = lensSatisfies(inRange(min, max), priceLens)

  return sortBy(view(priceLens), filter(isCovered, slots))
}

module.exports = range
