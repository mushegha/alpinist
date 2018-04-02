import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapState
} from 'vuex'

import {
  reduce,
  filter
} from 'ramda'

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
  openSlots () {
    return filter(x => !x.tickerClose, this.slots)
  },
  count () {
    return this.openSlots && this.openSlots.length
  },
  amount () {
    if (!this.openSlots) return void 0

    const sum = (acc, row) => {
      return acc + row.amount
    }

    return reduce(sum, 0, this.openSlots || [])
  },
  profitOpen () {
    const openSlots = filter(x => !x.tickerClose, this.slots)

    const getProfit = reduce((acc, r) => {
      const { orderOpen, orderClosed } = r

      const amount = orderOpen.amount

      const sub = amount * orderOpen.price
      const add = amount * this.ticker.bid

      return acc + add - sub
    }, 0)

    return getProfit(openSlots)
  },
  profitClosed () {
    const closedSlots = filter(x => x.tickerClose, this.slots)

    const getProfit = reduce((acc, r) => {
      const { orderOpen, orderClosed } = r

      const amount = orderOpen.amount

      const sub = amount * orderOpen.price
      const add = orderClosed
        ? orderClosed.price * amount
        : 0

      return acc + add - sub
    }, 0)

    return getProfit(closedSlots)
  },
  worth () {
    if (this.amount) return this.bid * this.amount
  },
  ...mapState({ slots: 'record', ticker: 'ticker' })
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
