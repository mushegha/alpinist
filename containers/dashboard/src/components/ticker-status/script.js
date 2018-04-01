import { Observable } from 'rxjs/Observable'

import { mapActions } from 'vuex'

import { pick } from 'ramda'

const props = ['symbol']

function data () {
  return {
    bid: null,
    ask: null
  }
}

function mounted () {
  const fromRemote = () =>
    this.fetch(this.symbol)

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, ({ bid, ask }) => {
    this.bid = bid
    this.ask = ask
  })
}

const methods = {
  ...mapActions('ticker', ['fetch'])
}

export default {
  data,
  props,
  methods,
  mounted
}
