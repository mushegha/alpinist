const debug = require('debug')('alp:trader:strategies:sell')

const {
  curryN,
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

// const mongo = require('../clients/mongo')
//
// const { getOpenSlots } = require('../getters/mongodb-ladder')
//
// const { markClose } = require('../actions/mongodb-ladder')
//
// const { submitOrder }  = require('../actions/bitfinex-order')

// const sellGiven = (slots) => {
//   const amount = reduce((sum, slot) => {
//     return sum - slot.amount
//   }, 0, slots)
//
//   return submitOrder({ amount })
// }

async function director (clients, trader, price) {
  const isProfitable = compose(
    gte(price),
    prop('priceOpen')
  )

  const hasEnoughToSell = compose(
    lte(trader.limitSell),
    length,
    takeWhile(isProfitable)
  )

  const hasEnoughToKeep = compose(
    lte(trader.limitKeep),
    length,
    dropWhile(isProfitable)
  )

  const shouldSell = both(
    hasEnoughToSell,
    hasEnoughToKeep
  )

  // Mock

  const slots = await monk
    .get('orders')
    .find(
      { trader: trader._id,
        dateClosed: { $exists: false } },
      { sort: { priceOpen: 1 } }
    )

  if (shouldSell(slots)) {
    const selling = take(trader.limitSell, slots)

    debug('Should sell %O', selling)

    // try {
    //   // TODO: exo
    //   // await sellGiven(selling)
    //   return markClose(price, selling)
    // } catch (err) {
    //   debug('Selling not complete: %s', err.message)
    // }
    //
    // return markClose(price, selling)
  }

  return Promise.resolve()
}

module.exports = curryN(3, director)
