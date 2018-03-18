const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:3030')

ws.on('open', () => {
  const data = JSON.stringify({
    type: 'subscribe',
    payload: {
      pair: 'btcusd',
      provider: 'bitfinex'
    }
  })

  ws.send(data)
})

ws.on('message', console.log)
