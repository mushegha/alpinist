import { mapGetters } from 'vuex'

import OrderTable from '@/components/order-table'
import OrderExport from '@/components/order-export'
import TickerMonitor from '@/components/ticker-monitor'
import AgentSwitch from '@/components/agent-switch'

const props = {
  id: String
}

const getters = mapGetters({
  'tickerOf': 'tickers/fromTarget',
  'byId': 'agents/byId',
  'ofAgent': 'orders/ofAgent'
})

const computed = {
  model () {
    return this.byId(this.id)
  },
  orders () {
    return this.ofAgent(this.id)
  },
  tickerData () {
    return this.tickerOf(this.model.ticker)
  },
  ...getters
}

const methods = {
  edit () {
    const name = 'agents-one-edit'
    const params = { id: this.id }
    this.$router.push({ name, params })
  }
}

export default {
  name: 'agents-one',
  props,
  computed,
  methods,
  components: {
    OrderTable,
    OrderExport,
    TickerMonitor,
    AgentSwitch
  }
}
