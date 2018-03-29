const debug = require('debug')('alp:trader:strategies:buy')

const Axios = require('axios')

const {
  curryN,
  unless,
  isNil,
  isEmpty,
  head,
  last,
  compose,
  gte,
  lte,
  prop,
  cond
} = require('ramda')

// const { getOpenSlots } = require('../getters/mongodb-ladder')
//
// const { openPosition } = require('../actions/mongodb-ladder')
//
// const { submitOrder }  = require('../actions/bitfinex-order')
//

const Records = Axios.create({ baseURL: 'http://records/' })


async function director (clients, trader, price) {

  const { monk } = clients

  /**
   * Helpers
   */

  const isInitial = isEmpty

  const renderInitial = () => {
    const investment = trader.investment
    const amount = investment / price

    return { amount, price }
  }

  const isNextFoot = compose(
    lte(price + trader.treshold),
    prop('priceInitial'),
    head
  )

  const renderNextFoot = slots => {
    const prev = head(slots)
    const prevInvestment = prev.priceInitial * prev.amount

    const investment = prevInvestment * trader.buyDownK + trader.buyDownB
    const amount = investment / price

    return { amount, price }
  }

  const isNextHead = compose(
    gte(price - trader.treshold),
    prop('priceInitial'),
    last
  )

  const renderNextHead = slots => {
    const prev = last(slots)
    const prevInvestment = prev.priceInitial * prev.amount

    const investment = prevInvestment * trader.buyUpK + trader.buyUpB
    const amount = investment / price

    return { amount, price }
  }

  const renderNext = cond([
    [ isInitial, renderInitial ],
    [ isNextFoot, renderNextFoot ],
    [ isNextHead, renderNextHead ]
  ])

  /**
   * Actions
   */

  const slots = await Records
    .get('/', {
      params: {
        trader: trader._id,
        status: 'open',
        sort  : 'priceInitial'
      }
    })
    .then(prop('data'))

  const nextSlot = renderNext(slots)

  if (!nextSlot) return null

  nextSlot.symbol = trader.symbol
  nextSlot.trader = trader._id

  // nextSlot.priceInitial = price
  // nextSlot.dateOpened = new Date()

  debug('Open position %O', nextSlot)

  Records.post('/', nextSlot)
  //
  // await monk
  //   .get('orders')
  //   .insert(nextSlot)
}

module.exports = curryN(3, director)
