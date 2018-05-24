import AgentTable from '@/components/agent-table'

function data () {
  const agents = [
    {
      id: 'a1',
      broker: 'bitfinex',
      symbol: 'ethusd'
    }, {
      id: 'a2',
      broker: 'cexio',
      symbol: 'btcusd'
    }
  ]

  return { agents }
}

export default {
  name: 'view-dashboard',
  components: {
    AgentTable
  },
  data
}
