const TickerSource = require('@alpinist/ticker-source-kafka')

const Strategy = require('@alpinist/agent-strategy')

const AgentStore = require('./lib/agent-store')
const OrderStore = require('./lib/order-store')

const host = '178.62.246.62:2181'

const ticker$ = TickerSource({ host })

const agentStore = AgentStore()
const orderStore = OrderStore()

function exec (ticker) {
  const execOne = agent => {
    console.log('processing', agent.id)

    return orderStore
      .getBuyOrdersByAgent(agent)
      .then(Strategy(agent, ticker))
      .then(orders => {
        console.log(orders)
        orders.forEach(order => orderStore.putOrder(order))
      })
  }

  const execAll = agents => {
    const ps = agents.map(execOne)

    return Promise.all(ps)
  }

  return agentStore
    .getActiveAgentsByTicker(ticker)
    .then(agents => {
      if (agents.length)
        console.log('active agents', agents.length)
      return agents
    })
    .then(agents => agents.forEach(execOne))
}

ticker$
  .subscribe(exec)
