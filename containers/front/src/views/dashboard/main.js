import {
  mapState,
  mapActions
} from 'vuex'

import AgentTable from '@/components/agent-table'

const state = mapState([
  'agents'
])

const methods = mapActions([
  'fetchAgents'
])

const computed = {
  ...state
}

function mounted () {
  return this
    .fetchAgents()
}

export default {
  name: 'view-dashboard',
  components: {
    AgentTable
  },
  computed,
  methods,
  // hooks
  mounted
}
