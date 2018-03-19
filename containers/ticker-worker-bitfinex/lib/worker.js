const WebSocket = require('ws')

const { prop, last, is } = require('ramda')

module.exports = async job => {
  const remoteWS = await new Promise(resolve => {
    const ws = new WebSocket('wss://api.bitfinex.com/ws/2')

    ws.once('open', () => {
      const msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD'
      })

      ws.send(msg)

      resolve(ws)
    })
  })

  const localWS = await new Promise(resolve => {
    const ws = new WebSocket('ws://localhost:3030')
    ws.once('open', () => resolve(ws))
  })

  const write = args => {
    const payload = {
      bid       : args[0],
      ask       : args[2],
      timestamp : new Date(),
      pair      : 'btcusd',
      provider  : 'bitfinex'
    }

    const msg = JSON.stringify({
      type: 'publish',
      payload
    })

    localWS.send(msg)
  }

  remoteWS.on('message', msg => {
    const data = JSON.parse(msg)
    const args = last(data)

    if (is(Array, args)) {
      write(args)
    }
  })

  remoteWS.on('close', () => console.log('closed'))

}
