const mongo = require('../clients/mongo')

const {
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
  dropWhile
} = require('ramda')

const options = {
  limitSell: 3,
  limitKeep: 1
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
  const isProfitable = compose(
    gte(price),
    prop('priceOpen')
  )

  const hasEnoughToSell = compose(
    lte(options.limitSell),
    length,
    takeWhile(isProfitable)
  )

  const hasEnoughToKeep = compose(
    lte(options.limitKeep),
    length,
    dropWhile(isProfitable)
  )

  const shouldSell = both(
    hasEnoughToSell,
    hasEnoughToKeep
  )

  const slots = await getOpenSlots()

  if (shouldSell(slots)) {
    const selling = take(options.limitSell, slots)

    const ids = map(prop('_id'), selling)

    console.log(ids)

    return mongo
      .get('ladder')
      .update(
        { _id: { $in: ids } },
        { priceClose: price, dateClose: new Date() },
        { multi: true }
      )
      .then(console.log)
  }

  return Promise.resolve()
}


module.exports = director
