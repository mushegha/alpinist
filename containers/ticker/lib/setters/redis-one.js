const debug = require('debug')('alp:ticker:setters')

const { curryN } = require('ramda')

function setOne (client, ticker) {
  const key = `ticker:${ticker.symbol}`

  debug('Updating %s', ticker.symbol)

  return client.hmset(key, ticker)
}

module.exports = curryN(2, setOne)
