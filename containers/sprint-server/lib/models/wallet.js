const bitfinex = require('../clients/bitfinex')

const { Wallet } = require('bitfinex-api-node/lib/models')

const {
  map,
  find,
  whereEq,
  prop
} = require('ramda')

/**
 * Clients
 */


const rest = bitfinex.rest(2)

/**
 * Methods
 */

const getAll = () => {
  const callback = (err, list) => {
    const serialize = map(data => new Wallet(data))

    return err
      ? Promise.reject(err)
      : serialize(list)
  }

  return rest.wallets(callback)
}

const getBalanceOf = target =>
  getAll()
    .then(find(whereEq(target)))
    .then(prop('balance'))

/**
 * Expose
 */

module.exports = {
  getAll,
  getBalanceOf
}
