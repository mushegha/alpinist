import { Observable } from 'rxjs/Observable'

import { get } from '~/services/ladder'

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

  const slots$ = Observable
    .interval(400)
    .flatMap(_ => get(params))

  return {
    slots$
  }
}

export default {
  props,
  data,
  mounted,
  subscriptions
}
