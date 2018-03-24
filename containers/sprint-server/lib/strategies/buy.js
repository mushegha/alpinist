const mongo = require('../clients/mongo')

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

const options = {
  treshold: 1,
  investment: 100
}

const symbol = 'tETHUSD'

const getOpenSlots = () => {
  const query = {
    dateClose: { $exists: false }
  }

  const options = {
    sort: { priceOpen: 1 }
  }

  return mongo
    .get('ladder')
    .find(query, options)
}

async function perform (params) {
  const { amount, symbol, price } = params

  return mongo
    .get('ladder')
    .insert({
      amount,
      symbol,
      priceOpen: price,
      dateOpen: new Date()
    })
}


async function director (price) {
  const isInitial = isEmpty

  const renderInitial = () => {
    const investment = options.investment
    const amount = investment / price

    return { amount, symbol, price }
  }

  const isNextFoot = compose(
    lte(price + options.treshold),
    prop('priceOpen'),
    head
  )

  const renderNextFoot = slots => {
    const prev = head(slots)
    const prevInvestment = prev.priceOpen * prev.amount

    const investment = prevInvestment
    const amount = investment / price

    return { amount, symbol, price }
  }

  const isNextHead = compose(
    gte(price - options.treshold),
    prop('priceOpen'),
    last
  )

  const renderNextHead = slots => {
    const prev = last(slots)
    const prevInvestment = prev.priceOpen * prev.amount

    const investment = prevInvestment
    const amount = investment / price

    return { amount, symbol, price }
  }

  const renderNext = cond([
    [ isInitial, renderInitial ],
    [ isNextFoot, renderNextFoot ],
    [ isNextHead, renderNextHead ]
  ])

  return getOpenSlots()
    .then(renderNext)
    .then(unless(isNil, perform))
}

module.exports = director
