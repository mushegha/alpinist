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

const usePrice = prop('priceOpen')

const sortedByPrice = sortBy(usePrice)

const edges = compose(
  juxt([head, last]),
  sortedByPrice
)

/**
 *
 */

function splitByPL (price, slots) {
  const pred = compose(
    lte(price),
    usePrice
  )

  const splitX = compose(
    map(x => x.length),
    splitWhen(pred),
    sortedByPrice
  )

  return splitX(slots)
}

function renderSlotsToSell (opts, price, slots) {
  const { sellLimit, keepLimit } = opts

  const render = compose(
    map(prop('id')),
    take(sellLimit),
    sortedByPrice
  )

  const [ right, left ] = splitByPL(price, slots)

  if (right >= sellLimit && left >= keepLimit) {
    return render(slots)
  } else {
    return []
  }
}

function getInvestment (opts, price, slots) {
  const {
    investment,
    treshold,
    upK, upB,
    downK, downB
  } = opts

  if (isEmpty(slots)) return investment

  const [lowest, highest] = edges(slots)

  if (price + treshold <= lowest.priceOpen) {
    return downK * lowest.investment + downB
  }

  if (price - treshold >= highest.priceOpen) {
    return upK * highest.investment + upB
  }
}

module.exports = {
  splitByPL,
  renderSlotsToSell,
  getInvestment
}
