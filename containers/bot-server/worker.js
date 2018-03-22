const rt = require('rethinkdb')

const { map } = require('ramda')

const H = require('./lib/helpers')

const Slots = require('./lib/api/ladder')

/**
 * Mocks
 */

const target = {
  origin: 'bitfinex',
  symbol: 'btcusd'
}

const params = {
  treshold: 5,
  // buy config
  investment: 50,
  upK: 1,
  upB: 25,
  downK: 2,
  downB: 0,
  // sell config
  sellLimit: 4,
  keepLimit: 1
}

async function perform (conn, tick) {
  const performBuy = Slots.buy(conn, tick)
  const performSell = Slots.sellSlot(conn, tick)

  await Slots
    .getAllOpen(conn, target)
    .then(slots => {
      const investment = H.getInvestment(params, tick.ask, slots)
      return performBuy(investment)
    })

  await Slots
    .getAllOpen(conn, target)
    .then(slots => {
      const ids = H.renderSlotsToSell(params, tick.bid, slots)
      return Promise.all(map(performSell, ids))
    })
}

async function run () {
  const conn = await rt.connect()

  const Ticker = rt
    .db('alpinist')
    .table('ticker')

  const cursor = await Ticker
    .orderBy({ index: rt.desc('time') })
    .filter(target)
    .limit(1)
    .changes()
    .run(conn)

  cursor
    .each((_, ch) => perform(conn, ch.new_val))
}

run()
