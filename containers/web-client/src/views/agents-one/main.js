import { mapGetters } from 'vuex'

import OrderTable from '@/components/order-table'
import TickerMonitor from '@/components/ticker-monitor'
import AgentSwitch from '@/components/agent-switch'

const props = {
  id: String
}

const computed = {
  ...mapGetters({
    'byId': 'agents/byId',
    'ofAgent': 'orders/ofAgent'
  }),
  model () {
    return this.byId(this.id)
  },
  orders () {
    return this.ofAgent(this.id)
  }
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
