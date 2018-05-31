const debug = require('debug')('alpinist:agents')

const getenv = require('getenv')

const TickerSource = require('@alpinist/ticker-source-kafka')

const Strategy = require('@alpinist/agent-strategy')

const AgentStore = require('./lib/agent-store')
const OrderStore = require('./lib/order-store')

/**
 * Settings
 */

const ZOOKEEPER_SETTINGS = getenv.multi({
  host: ['ZOOKEEPER_HOST', 'localhost'],
  port: ['ZOOKEEPER_PORT', 2182, 'int']
})

const ZOOKEEPER_URL = `${ZOOKEEPER_SETTINGS.host}:${ZOOKEEPER_SETTINGS.port}`

/**
 * Init
 */

const ticker$ = TickerSource({ host: ZOOKEEPER_URL })

const agentStore = AgentStore()
const orderStore = OrderStore()

const report = err =>
  debug('Error %s', err.message)

function exec (ticker) {
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

ticker$
  .subscribe(exec)
