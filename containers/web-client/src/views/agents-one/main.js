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
    TickerMonitor,
    AgentSwitch
  }
}
