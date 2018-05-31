import { mapGetters } from 'vuex'

import OrderTable from '@/components/order-table'
import TickerMonitor from '@/components/ticker-monitor'
import AgentSwitch from '@/components/agent-switch'

const props = {
  id: String
}

const getters = mapGetters({
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
  ...getters
}

export default {
  name: 'agents-one',
  props,
  computed,
  components: {
    OrderTable,
    TickerMonitor,
    AgentSwitch
  }
}
