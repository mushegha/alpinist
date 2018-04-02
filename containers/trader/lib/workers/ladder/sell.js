const debug = require('debug')('alp:trader:strategies')

const Axios = require('axios')


const {
  curryN,
  both,
  filter,
  prop,
} = require('ramda')

const Records = Axios.create({ baseURL: 'http://records/' })

async function director (trader, ticker) {
  const price = ticker.bid

  const isProfitable = record => {
    return record.priceInitial < price
  }

  const hasEnoughToSell = records => {
    const profitable = filter(isProfitable, records)
    return profitable.length >= trader.limitSell + trader.limitKeep
  }

  // const hasEnoughToKeep = records => {
  //   const { limitSell, limitKeep } = trader
  //   return records.length >= limitSell + limitKeep
  // }

  // const shouldSell = both(
  //   hasEnoughToSell,
  //   hasEnoughToKeep
  // )

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

  if (hasEnoughToSell(slots)) {

    debug('Should sell %d positions for %d', trader.limitSell, price)

    const params = {
      trader: trader._id,
      status: 'open',
      sort  : 'priceInitial',
      limit : trader.limitSell
    }

    return Records
      .put('/', { tickerClose: ticker }, { params })
      .then(prop('data'))
  }

  return Promise.resolve()
}

module.exports = curryN(2, director)
