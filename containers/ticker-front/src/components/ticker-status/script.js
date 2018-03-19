import { Observable } from 'rxjs/Observable'

import { get } from '~/services/ticker'

import * as computed from './computed'

const props = []

const data = () => {
  return {}
}


function mounted () {

}


function subscriptions () {
  const params = {
    pair: 'btcusd',
    provider: 'bitfinex'
  }

  const status$ = Observable
    .interval(400)
    .flatMap(_ => get(params))

  return {
    status$
  }
}

export default {
  props,
  data,
  computed,
  mounted,
  subscriptions
}
