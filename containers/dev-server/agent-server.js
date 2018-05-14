const {
  Producer,
  Client
} = require('kafka-node')

const Strategy = require('@alpinist/agent-strategy')

const TickerSource = require('@alpinist/ticker-source-kafka')

const Store = require('@alpinist/order-store')

const H = require('./helpers')

const store= new Store()

function compile (ticker) {
  const agents = H.relevantAgentsBy(ticker)

  return agents.map(agent => {
    const selector = {
      agent: agent.agent,
      side: 'buy'
    }

    const ordersP = store
      .find({ selector })
      .then(res => res.docs)
      .then(slots => Strategy(agent, ticker, slots))
      .then(orders => {
        return orders.map(order => store.putOrder(order))
      })
      .then(ps => Promise.all(ps))

    return ordersP
  })
}

const ticker$ = TickerSource()

ticker$
  .subscribe(compile)
//
//
// const client = new Client('127.0.0.1:2181')
//
// const producer = new Producer(client)
//
// producer.on('ready', _ => {
//   const send = payloads =>
//     producer.send(payloads, (err, data) => {})
//
//   TickerSource()
//     .subscribe(send)
// })
