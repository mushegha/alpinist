const debug = require('debug')('alpinist:agents')

const getenv = require('getenv')

const { TickersObservable } = require('./lib/channel')

const Strategy = require('./lib/strategy')

const AgentStore = require('./lib/agent-store')
const OrderStore = require('./lib/order-store')

/**
 * Init
 */

const agentStore = AgentStore()
const orderStore = OrderStore()

const report = err =>
  debug('Error %s', err.message)

function evaluate (ticker) {
  debug('Processing ticker %s %s', ticker.broker, ticker.symbol)

  const execOne = agent => {
    debug('Processing orders for agent %s', agent.id)

    const putOrder = order =>
      orderStore
        .putOrder(order)
        .catch(report)

    return orderStore
      .getBuyOrdersByAgent(agent)
      .then(Strategy(agent, ticker))
      .then(orders => {
        debug('Update orders %O', orders)
        orders.forEach(putOrder)
      })
      .catch(report)
  }

  return agentStore
    .getActiveAgentsByTicker(ticker)
    .then(agents => agents.forEach(execOne))
    .catch(report)
}

TickersObservable()
  .subscribe(evaluate)
