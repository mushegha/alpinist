const {
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

    return markClose(price, selling)
  }

  return Promise.resolve()
}


module.exports = director
