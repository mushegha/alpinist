import {
  mapGetters
} from 'vuex'

import { pick } from 'ramda'

const props = {
  details: Object
}

const computed = {
  ...mapGetters('ticker', { ticker: 'last' }),
  isProfit () {
    // return true
    return this.details.priceOpen < (this.ticker || {}).bid
  },
  price () {
    return this.details.priceOpen
  },
  amount () {
    return this.details.amount.toFixed(4)
  },
  investment () {
    const { priceOpen, amount } = this.details
    const investment = priceOpen * amount
    return investment.toFixed(3)
  }
}

export default {
  name: 'ladder-panel-block',
  props,
  computed
}
