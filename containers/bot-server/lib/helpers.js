const {
  juxt,
  cond,
  always,
  T,
  isEmpty,
  last,
  head,
  take,
  and,
  map,
  compose,
  lte,
  prop,
  splitWhen,
  sortBy
} = require('ramda')

/**
 * Utils
 */

const useOpenPrice = prop('openPrice')

const sortedByPrice = sortBy(useOpenPrice)

const edges = compose(
  juxt([head, last]),
  sortedByPrice
)

/**
 *
 */

function splitByPL (mark, slots) {

  const pred = compose(
    lte(mark),
    useOpenPrice
  )

  const splitX = compose(
    splitWhen(pred),
    sortedByPrice
  )

  return splitX(slots)
}

function isEligibleToSell (opts, mark, slots) {
  const { sellLimit, keepLimit } = opts

  const measure = map(x => x.length)

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

function getInvestment (opts, mark, slots) {
  const {
    initialInvestment,
    treshold,
    upK, upB,
    downK, downB
  } = opts

  if (isEmpty(slots)) return initialInvestment

  const [lowest, highest] = edges(slots)

  if (mark + treshold <= lowest.openPrice) {
    return downK * initialInvestment + downB
  }

  if (mark - treshold >= highest.openPrice) {
    return upK * initialInvestment + upB
  }
}

function renderSlotsToBuy (opts, openPrice, slots) {
  const investment = getInvestment(opts, openPrice, slots)

  const slot = {
    investment,
    openPrice
  }

  return investment
    ? [slot]
    : []
}

module.exports = {
  splitByPL,
  isEligibleToSell,
  renderSlotsToSell,
  getInvestment,
  renderSlotsToBuy
}
