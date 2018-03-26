const debug = require('debug')('alpinist:ticker:getters')

const {
  evolve,
  ifElse,
  isEmpty,
  curryN
} = require('ramda')

/**
 * Helpers
 */

const stubNull = () => null

const parse = evolve({
  bid: Number,
  ask: Number
})


function getOne (client, symbol) {
  const key = `ticker:${symbol}`

  return client
    .hgetall(key)
    .then(ifElse(isEmpty, stubNull, parse))
}


module.exports = curryN(2, getOne)
