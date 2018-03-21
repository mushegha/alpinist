const {
  take,
  and,
  map,
  compose,
  lte,
  prop,
  splitWhen,
  sortBy
} = require('ramda')

function splitByPL (mark, slots) {
  const useOpenPrice = prop('openPrice')

  const pred = compose(
    lte(mark),
    useOpenPrice
  )

  const splitX = compose(
    splitWhen(pred),
    sortBy(useOpenPrice)
  )

  return splitX(slots)
}

function isEligibleToSell (opts, mark, slots) {
  const measure = map(x => x.length)

  const { sellLimit, keepLimit } = opts

  const [ right, left ] = measure(splitByPL(mark, slots))

  return and(
    right >= sellLimit,
    left >= keepLimit
  )
}

function renderSlotsToSell (opts, mark, slots) {
  const { sellLimit, keepLimit } = opts

  if (!isEligibleToSell(opts, mark, slots)) return []

  return take(sellLimit, slots)
}

module.exports = {
  splitByPL,
  isEligibleToSell,
  renderSlotsToSell
}
