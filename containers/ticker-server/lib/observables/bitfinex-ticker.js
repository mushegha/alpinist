const debug = require('debug')('alpinist:ticker:observable')

const { Observable } = require('rxjs')

const Bitfinex = require('../clients/bitfinex')

function create () {
  const bfx = Bitfinex()

  const ws = bfx.ws(2)

  ws.on('open', () => { // wait for socket open
    ws.auth()           // & authenticate

    debug('open')
  })

  ws.on('error', (err) => {
    console.log(err)
    debug('error: %j', err)
  })

  ws.once('auth', () => {
    debug('authenticated')
    // do something with authenticated ws stream
    ws.subscribeTicker('tBTCUSD')
    ws.subscribeTicker('tNEOUSD')
  })

  ws.on('message', console.log)

  // ws.onTicker({ symbol: 'tBTCUSD' }, ticker => {
  //   debug('%s ticker: %j', ticker)
  // })

  // Open the websocket connection
  ws.open()

  return Observable.create(observer => {
    const int = setInterval(() => observer.next(1), 1000)
    return () => clearIntervale(int)
  })
}


module.exports = create
