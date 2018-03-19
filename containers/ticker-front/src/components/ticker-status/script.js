import { Observable } from 'rxjs/Observable'

import { get } from '~/services/ticker'

import * as computed from './computed'

const props = []

const data = () => {
  return {}
}


function mounted () {
  const params = {
    pair: 'btcusd',
    provider: 'bitfinex'
  }

  get(params).then(console.log)
}


function subscriptions () {
  return {
    status: Observable.from([{ bid: 999, ask: 1001 }])
  }
}

export default {
  props,
  data,
  computed,
  mounted,
  subscriptions
}
