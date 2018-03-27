const debug = require('debug')('alp:trader:strategies:buy')

const {
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

async function director (opts, price) {
  const isInitial = isEmpty

  const renderInitial = () => {
    const investment = opts.investment
    const amount = investment / price

    return { amount, price }
  }

  const isNextFoot = compose(
    lte(price + opts.treshold),
    prop('priceOpen'),
    head
  )

  const renderNextFoot = slots => {
    const prev = head(slots)
    const prevInvestment = prev.priceOpen * prev.amount

    const investment = prevInvestment * opts.downK + opts.downB
    const amount = investment / price

    return { amount, price }
  }

  const isNextHead = compose(
    gte(price - opts.treshold),
    prop('priceOpen'),
    last
  )

  const renderNextHead = slots => {
    const prev = last(slots)
    const prevInvestment = prev.priceOpen * prev.amount

    const investment = prevInvestment * opts.upK + opts.upB
    const amount = investment / price

    return { amount, price }
  }

  const renderNext = cond([
    [ isInitial, renderInitial ],
    [ isNextFoot, renderNextFoot ],
    [ isNextHead, renderNextHead ]
  ])

  // Mock
  //



  return Promise
    .resolve([])
    .then(renderNext)
    .then(({ amount, price }) => {
      debug('Should buy %d for price %d', amount, price)
    })
    // TODO: exo
    // .then(unless(isNil, submitOrder))
    // .then(unless(isNil, openPosition))
    .catch(err => {
      debug('Order not completed for reason: %s', err.message)
    })
}

module.exports = director
