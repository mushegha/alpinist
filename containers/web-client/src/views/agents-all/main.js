import { mapGetters } from 'vuex'

import AgentTable from '@/components/agent-table'

const state = mapGetters({
  'agents': 'agents/asArray'
})

const computed = {
  ...state
}

const methods = {
  create () {
    const name = 'agents-new'
    this.$router.push({ name })
  }
}

export default {
  name: 'agents-all',
  components: {
    AgentTable
  },
  computed,
  methods
}
