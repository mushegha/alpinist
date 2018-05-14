const {
  filter,
  whereEq
} = require('ramda')


function relevantAgentsBy ({ broker, symbol } = {}) {
  const agents = [
    {
      agent: 'agent1',
      broker: 'cexio',
      symbol: 'ethusd',
      level_threshold: 5,
      weight_initial: 100,
      weight_up_b: 10,
      weight_up_k: 2,
      weight_down_b: 15,
      weight_down_k: 1.75,
      limit_close: 2,
      limit_keep: 1
    }, {
      agent: 'agent2',
      broker: 'bitfinex',
      symbol: 'btcusd',
      level_threshold: 25,
      weight_initial: 500,
      weight_up_b: 50,
      weight_up_k: 2,
      weight_down_b: 100,
      weight_down_k: 1.75,
      limit_close: 4,
      limit_keep: 1
    }
  ]

  return filter(whereEq({ broker, symbol }), agents)
}


module.exports = {
  relevantAgentsBy
}
