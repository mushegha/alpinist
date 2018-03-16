const { prop } = require('ramda')

const { connect } = require('./rethinkdb-client')

const observe = require('./ticker-observable')

function work (pred) {
  const go = conn => {
    const sub = observe(pred, conn)
      .map(prop('new_val'))
      .subscribe(console.log)

    setTimeout(() => {
      console.log('exiting')
      sub.unsubscribe()
    }, 10000)
  }

  connect().then(go)
}

work({
  pair: 'btcusd',
  provider: 'bitfinex'
})
