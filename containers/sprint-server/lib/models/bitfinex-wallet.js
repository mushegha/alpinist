const bitfinex = require('../clients/bitfinex')

const {
  assoc,
  toLower,
  zipObj,
  pick,
  filter,
  map,
  find,
  whereEq,
  propEq,
  prop,
  head,
  list,
  reduce,
  tap
} = require('ramda')

/**
 * Clients
 */


const rest = bitfinex.rest(2)

/**
 * Helpers
 */

const from = data => {
  const keys = [
    'type',
    'currency',
    'balance'
  ]

  return Array.isArray(data)
    ? zipObj(keys, data)
    : pick(keys, data)
}

/**
 * Methods
 */

async function getAll (pred = {}) {
  const query = filter(whereEq(pred))

  const callback = (err, list) => {
    return err
      ? Promise.reject(err)
      : Promise.resolve(list)
  }

  return rest
    .wallets(callback)
    .then(map(from))
    .then(query)
}

async function aggregate (pred) {
  const scanTo = (acc, { currency, balance }) => {
    const key = toLower(currency)
    return assoc(key, balance, acc)
  }

  return getAll(pred)
    .then(reduce(scanTo, {}))
}

/**
 * Expose
 */

module.exports = {
  getAll,
  aggregate
}
