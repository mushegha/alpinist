const { prop } = require('ramda')

const { Server } = require('ws')

const { connect } = require('./rethinkdb-connection')

const observe = require('./ticker-observable')

const { parse, stringify } = JSON

const wss = new Server({ port: 3030 })

wss.on('connection', ws => {
  ws.on('message', msg => {
    try {
      const { type, payload } = parse(msg)
      ws.emit(type, payload)
    } catch (err) {
      console.error(err)
    }
  })

  ws.on('close', () => {
    ws.emit('unsubscribe')
  })

  ws.on('subscribe', pred => {
    const send = data =>
      ws.send(stringify(data))

    const subscribe = observable => {
      const source = observable
        .map(prop('new_val'))
        .subscribe(send)

      const teardown = () =>
        source.unsubscribe()

      ws.on('unsubscribe', teardown)
    }

    connect()
      .then(observe(pred))
      .then(subscribe)
  })
})


