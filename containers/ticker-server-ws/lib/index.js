const { connect } = require('./rethinkdb-connection')

const observe = require('./ticker-observable')

const { parse, stringify } = JSON

module.exports = ws => {
  const emit = (event, data) =>
    ws.emit(event, data)

  const send = data =>
    ws.send(data)

  ws.on('message', msg => {
    try {
      const { type, payload } = parse(msg)
      emit(type, payload)
    } catch (err) {
      console.error(err)
      emit('error', err)
    }
  })

  ws.on('close', () => emit('unsubscribe'))

  ws.on('subscribe', pred => {
    const subscribe = observable => {
      const source = observable
        .map(stringify)
        .subscribe(send)

      const teardown = () =>
        source.unsubscribe()

      ws.on('unsubscribe', teardown)
    }

    connect()
      .then(observe(pred))
      .then(subscribe)
  })

  return ws
}


