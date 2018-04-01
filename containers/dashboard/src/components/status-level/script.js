import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapState
} from 'vuex'

import { reduce } from 'ramda'

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

const computed = {
  count () {
    return this.slots && this.slots.length
  },
  amount () {
    if (!this.slots) return void 0

    const sum = (acc, row) => {
      return acc + row.amount
    }

    return reduce(sum, 0, this.slots || [])
  },
  worth () {
    if (this.amount) return this.bid * this.amount
  },
  ...mapState({ slots: 'record' })
}

const filters = {
  toUpper (val) {
    return val.toUpperCase()
  }
}

export default {
  data,
  props,
  methods,
  mounted,
  computed,
  filters
}
