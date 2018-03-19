import * as computed from './computed'

const props = []

const data = () => {
  return {
    bid: null,
    ask: null
  }
}

function mounted () {
  const ws = new WebSocket('ws://localhost:8081')

  ws.onopen = () => {
    ws.onmessage = console.log

    ws.send(JSON.stringify({
      pair: 'btcusd',
      provider: 'bitfinex'
    }))
  }
}

export default {
  props,
  data,
  computed,
  mounted
}
