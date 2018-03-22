const rt = require('rethinkdb')

const {
  curry,
  map,
  sortBy,
  path,
  prop,
  assoc,
  merge,
  head,
  last,
  take,
  groupBy
} = require('ramda')

const H = require('./lib/helpers')

const Slots = require('./lib/api/ladder')

/**
 * Mocks
 */

const target = {
  origin: 'bitfinex',
  symbol: 'btcusd'
}

const opts = {
  // buy config
  initialInvestment: 50,
  treshold: 5,
  upK: 1,
  upB: 25,
  downK: 2,
  downB: 0,
  // sell config
  sellLimit: 4,
  keepLimit: 1
}


async function run () {
  const conn = await rt.connect()

  const Ticker = rt
    .db('alpinist')
    .table('ticker')

  const LadderTable = rt
    .db('alpinist')
    .table('ladder')



  const cursor = await Ticker
    .orderBy({ index: rt.desc('time') })
    .filter(target)
    .limit(1)
    .changes()
    .run(conn)

  cursor.each(async (_, ch) => {

    const {
      bid,
      ask,
      origin,
      symbol,
      time
    } = ch.new_val

    const slots = await Slots.getAllOpen(conn, target)

    const investment = H.getInvestment(opts, ask, slots)

    console.log('~', bid, ask)

    await Slots.buy(conn, ch.new_val, investment)
      .then(console.log)

    const sellSlots = H.renderSlotsToSell(opts, bid, slots)

    console.log('>', sellSlots)

    const sell = Slots.sellSlot(conn, ch.new_val)

    await Promise.all(map(sell, sellSlots))
      .then(console.log)
  })

}

run()
