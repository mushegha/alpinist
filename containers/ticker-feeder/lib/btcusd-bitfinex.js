const WebSocket = require('ws')

const { Observable } = require('rxjs')

const { prop, last, is } = require('ramda')

const rt = require('rethinkdb')

const { connect } = require('./rethinkdb-connection')

module.exports = async job => {
  const ws = new WebSocket('wss://api.bitfinex.com/ws/2')

  const conn = await connect()

  const write = args => {
    const data = {
      bid       : args[0],
      ask       : args[2],
      timestamp : rt.now(),
      pair      : 'btcusd',
      provider  : 'bitfinex'
    }

    rt.db('alpinist')
      .table('ticker')
      .insert(data)
      .run(conn)
  }


  const source = Observable
    .fromEvent(ws, 'message', prop('data'))
    .map(JSON.parse)
    .map(last)
    .filter(is(Array))
    .subscribe(write)

  const listen = () => {
    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: 'tBTCUSD'
    })

    ws.send(msg)
  }

  ws.on('open', listen)
}
