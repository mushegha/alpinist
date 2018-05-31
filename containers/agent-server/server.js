const debug = require('debug')('alpinist:orders')

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
    debug('Processing orders for agent %s', agent.id)

    return orderStore
      .getBuyOrdersByAgent(agent)
      .then(Strategy(agent, ticker))
      .then(orders => {
        debug('Update orders %O', orders)
        orders.forEach(order => orderStore.putOrder(order))
      })
  }

  const execAll = agents => {
    const ps = agents.map(execOne)

    return Promise.all(ps)
  }

  return agentStore
    .getActiveAgentsByTicker(ticker)
    .then(agents => agents.forEach(execOne))
}

ticker$
  .subscribe(exec)
