const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:3030')

ws.on('open', () => {
  const interval = setInterval(() => {
    const data = JSON.stringify({
      type: 'publish',
      payload: {
        pair: 'btcusd',
        provider: 'bitfinex',
        bid: 10000 - Math.random() * 10,
        ask: 10000 + Math.random() * 10
      }
    })

    ws.send(data)
  }, 1000)

  ws.on('close', () => clearInterval(interval))
})

ws.on('message', console.log)
