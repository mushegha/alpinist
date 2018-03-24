const debug = require('debug')('alpinist:buying-strategy')

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

const mongo = require('../clients/mongo')

const { getOpenSlots } = require('../getters/mongodb-ladder')

const { openPosition } = require('../actions/mongodb-ladder')

const { submitOrder }  = require('../actions/bitfinex-order')


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

    const investment = prevInvestment * downK + downB
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

    const investment = prevInvestment * upK + upB
    const amount = investment / price

    return { amount, price }
  }

  const renderNext = cond([
    [ isInitial, renderInitial ],
    [ isNextFoot, renderNextFoot ],
    [ isNextHead, renderNextHead ]
  ])

  return getOpenSlots()
    .then(renderNext)
    // TODO: exo
    // .then(unless(isNil, submitOrder))
    .then(unless(isNil, openPosition))
    .catch(() => debug('Order not completed'))
}

module.exports = director
