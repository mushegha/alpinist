const debug = require('debug')('alp:trader:strategies:sell')

const Axios = require('axios')

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
  dropWhile,
  drop
} = require('ramda')

const Records = Axios.create({ baseURL: 'http://records/' })

async function director (clients, trader, price) {
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

    debug('Should sell')

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
      .then(console.log)
  }

  return Promise.resolve()
}

module.exports = curryN(3, director)
