const TickerSource = require('@alpinist/ticker-source-kafka')

const AgentStore = require('./lib/agent-store')
const OrderStore = require('./lib/order-store')

const host = '178.62.246.62:2181'

const ticker$ = TickerSource({ host })

const agentStore = AgentStore()
const orderStore = OrderStore()

function exec (ticker) {
  const execOne = agent =>
    orderStore
      .getBuyOrdersByAgent(agent)

  const execAll = agents => {
    const ps = agents.map(execOne)

    return Promise
      .all(ps)
  }

  return agentStore
    .getActiveAgentsByTicker(ticker)
    .then(execAll)
    .then(arr => arr.length && console.log(arr))
}

ticker$
  .subscribe(exec)
