import { Observable } from 'rxjs/Observable'

import * as computed from './computed'

const props = []

const data = () => {
  return {}
}

function mounted () {

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
