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


const Records = Axios.create({ baseURL: 'http://records/' })


async function director (trader, price) {
  /**
   * Helpers
   */

  const isInitial = isEmpty

  const renderInitial = () => {
    return trader.investment
  }

  const isNextFoot = compose(
    lte(price + trader.treshold),
    prop('priceInitial'),
    head
  )

  const renderNextFoot = slots => {
    const prev = head(slots)
    const prevInvestment = prev.priceInitial * prev.amount

    return prevInvestment * trader.buyDownK + trader.buyDownB
  }

  const isNextHead = compose(
    gte(price - trader.treshold),
    prop('priceInitial'),
    last
  )

  const renderNextHead = slots => {
    const prev = last(slots)
    const prevInvestment = prev.priceInitial * prev.amount

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
    trader: trader._id
  }

  debug('Open position %O', next)

  return  Records.post('/', next)
}

module.exports = curryN(2, director)
