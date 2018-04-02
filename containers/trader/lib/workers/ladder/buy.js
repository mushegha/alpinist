const debug = require('debug')('alp:trader:strategies')

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
  path,
  cond
} = require('ramda')


const Records = Axios.create({ baseURL: 'http://records/' })


async function director (trader, ticker) {
  const price = ticker.ask
  /**
   * Helpers
   */

  const isInitial = isEmpty

  const renderInitial = () => {
    return trader.investment
  }

  const isNextFoot = compose(
    lte(price + trader.treshold),
    path(['orderOpen', 'price']),
    head
  )

  const renderNextFoot = slots => {
    const { orderOpen } = head(slots)

    const prevInvestment = orderOpen.price * orderOpen.amount

    return prevInvestment * trader.buyDownK + trader.buyDownB
  }

  const isNextHead = compose(
    gte(price - trader.treshold),
    path(['orderOpen', 'price']),
    last
  )

  const renderNextHead = slots => {
    const { orderOpen } = last(slots)

    const prevInvestment = orderOpen.price * orderOpen.amount

    return prevInvestment * trader.buyUpK + trader.buyUpB
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

  const investment = renderNext(slots)

  if (!investment) return void 0

  const next = {
    amount: investment / price,
    symbol: trader.symbol,
    trader: trader._id,
    tickerOpen: ticker
  }

  debug('Should open position %O', next)

  return  Records
    .post('/', next)
}

module.exports = curryN(2, director)
