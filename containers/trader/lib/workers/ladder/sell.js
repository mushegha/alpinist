const debug = require('debug')('alp:trader:strategies')

const Axios = require('axios')

const {
  curryN,
  both,
  filter,
  prop,
} = require('ramda')

const Records = Axios.create({ baseURL: 'http://records/' })

async function director (trader, price) {
  const isProfitable = record => {
    return record.priceInitial < price
  }

  const hasEnoughToSell = records => {
    const profitable = filter(isProfitable, records)
    return profitable.length >= trader.limitSell
  }

  const hasEnoughToKeep = records => {
    const { limitSell, limitKeep } = trader
    return records.length >= limitSell + limitKeep
  }

  const shouldSell = both(
    hasEnoughToSell,
    hasEnoughToKeep
  )

  // Mock

  const slots = await Records
    .get('/', {
      params: {
        trader: trader._id,
        status: 'open',
        sort  : 'priceInitial'
      }
    })
    .then(prop('data'))

  if (shouldSell(slots)) {

    debug('Should sell %d positions for %d', trader.limitSell, price)

    return Records
      .delete('/', {
        params: {
          trader: trader._id,
          status: 'open',
          sort  : 'priceInitial',
          limit : trader.limitSell
        }
      })
      .then(prop('data'))
  }

  return Promise.resolve()
}

module.exports = curryN(2, director)
