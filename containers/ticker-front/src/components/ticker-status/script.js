import WebSocket from 'ws'

import * as computed from './computed'

const props = []

const data = () => {
  return {
    bid: null,
    ask: null
  }
}

function mounted () {
  const ws = new WebSocket('ws://localhost:3030')

  ws.on('message', console.log)
}

export default {
  props,
  data,
  computed,
  mounted
}
