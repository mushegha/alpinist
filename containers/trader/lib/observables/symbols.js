const debug = require('debug')('alp:trader:observable:symbols')

const { Observable } = require('rxjs')

const {
  concat,
  drop
} = require('ramda')

/**
 * Constants
 */

const PREFIX = '__keyspace@0__:ticker:'

/**
 * Helpers
 */

const withPrefix = concat(PREFIX)

const withoutPrefix = drop(PREFIX.length)

/**
 * Factory
 */

function Symbols ({ redis }) {
  const client = redis.duplicate()

  const pattern = withPrefix('*')

  const emitter = observer => {
    client.on('pmessage', (pattern, channel) => {
      const symbol = withoutPrefix(channel)

      debug('Updated for %s', symbol)
      observer.next(symbol)
    })

    // unsubscribe
    return () => {
      debug('Unsubscribe')

      debug('Closing Redis connection')
      client.quit(() => {
        debug('Redis connection closed')
      })
    }
  }

  client.psubscribe(pattern, () => {
    debug('Subscribed to %s', pattern)
  })

  return Observable.create(emitter)
}

/**
 * Expose factory
 */

module.exports = Symbols

