const debug = require('debug')('alpinist:ticker:setters')

const { curryN } = require('ramda')

function setOne (client, payload) {
  const { symbol, bid, ask } = payload

  const key = `ticker:${symbol}`

  debug('Updating %s', symbol)

  return client.hmset(key, { bid, ask })
}

module.exports = curryN(2, setOne)
