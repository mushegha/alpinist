const {
  tap,
  unnest,
  assoc,
  map,
  juxt,
  curryN,
  compose,
  flip
} = require('ramda')

const commitFill = require('./commit-fill')
const commitDrop = require('./commit-drop')

const H = require('./helpers')

function evaluate (agent, ticker, orders) {
  const updated = compose(
    commitDrop(agent.settings, ticker.bid_price),
    commitFill(agent.settings, ticker.ask_price),
  )

  const toSell = compose(
    assoc('sell_price', ticker.bid_price),
    assoc('side', 'sell')
  )

  const toBuy = compose(
    assoc('buy_price', ticker.ask_price),
    assoc('side', 'buy')
  )

  const compactDiff = juxt([
    compose(
      map(toSell),
      H.diff
    ),
    compose(
      map(toBuy),
      flip(H.diff)
    )
  ])

  const complete = compose(
    assoc('agent', agent.id),
    assoc('broker', ticker.broker),
    assoc('symbol', ticker.symbol),
    assoc('kind', 'market')
  )

  const op = compose(
    map(complete),
    unnest,
    compactDiff(orders),
    updated
  )

  return op(orders)
}

module.exports = curryN(3, evaluate)
