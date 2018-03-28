const debug = require('debug')('alp:trader:observable')

const { Observable } = require('rxjs')

const createClient = require('../clients/redis')

const getTicker = require('../getters/redis-ticker')

function Tickers () {
  const client = createClient()

  const prefix = `__keyspace@0__:ticker:`
  const pattern = `${prefix}*`

  client.psubscribe(pattern)

  const emitter = observer => {
    const emit = x =>
      observer.next(x)

    client.on('pmessage', (pattern, channel) => {
      const symbol = channel.replace(prefix, '')

      debug('Updated ticker for %s', symbol)

      observer.next(symbol)
    })

    // unsubscribe
    return () => {}
  }

  return Observable.create(emitter)
}


module.exports = () => {
  const client = createClient()

  return Tickers()
    .flatMap(getTicker(client))
    .do(data => debug('Ticker data received: %O', data))
}
