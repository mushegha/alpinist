const debug = require('debug')('alpinist:selling-strategy')

const {
  reduce,
  take,
  map,
  both,
  length,
  filter,
  lte,
  gte,
  prop,
  compose,
  takeWhile,
  dropWhile
} = require('ramda')

const mongo = require('../clients/mongo')

const { getOpenSlots } = require('../getters/mongodb-ladder')

const { markClose } = require('../actions/mongodb-ladder')

const { submitOrder }  = require('../actions/bitfinex-order')

const sellGiven = (slots) => {
  const amount = reduce((sum, slot) => {
    return sum - slot.amount
  }, 0, slots)

  return submitOrder({ amount })
}

async function director (opts, price) {
  const isProfitable = compose(
    gte(price),
    prop('priceOpen')
  )

  const hasEnoughToSell = compose(
    lte(opts.limitSell),
    length,
    takeWhile(isProfitable)
  )

  const hasEnoughToKeep = compose(
    lte(opts.limitKeep),
    length,
    dropWhile(isProfitable)
  )

  const shouldSell = both(
    hasEnoughToSell,
    hasEnoughToKeep
  )

  const slots = await getOpenSlots()

  if (shouldSell(slots)) {
    const selling = take(opts.limitSell, slots)

    try {
      // TODO: exo
      // await sellGiven(selling)
      return markClose(price, selling)
    } catch (err) {
      debug('Selling not complete: %s', err.message)
    }

    return markClose(price, selling)
  }

  return Promise.resolve()
}


module.exports = director
