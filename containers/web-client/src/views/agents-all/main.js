import { mapGetters } from 'vuex'

import AgentTable from '@/components/agent-table'

const state = mapGetters({
  'agents': 'agents/asArray'
})

const computed = {
  ...state
}

export default {
  name: 'agents-all',
  components: {
    AgentTable
  },
  computed
}
