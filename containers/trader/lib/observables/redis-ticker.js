const debug = require('debug')('alp:ticker:observable')

const { Observable } = require('rxjs')

const createClient = require('../clients/redis')

const getOne = require('../getters/redis-one')


function create (symbol) {
  const client = createClient()

  const sub = createClient()

  const key = `alp:ticker:${symbol}`
  const channel = `__keyspace@0__:${key}`

  sub.subscribe(channel)

  const emitter = observer => {
    const emit = x =>
      observer.next(x)

    sub.on('message', () => {
      getOne(client, symbol)
        .then(emit)
    })

    // unsubscribe
    return () => {}
  }

  return Observable.create(emitter)
}


module.exports = create
