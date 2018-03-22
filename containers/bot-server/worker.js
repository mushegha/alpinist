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

const focusArea = {
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
    .filter(focusArea)
    .limit(1)
    .changes()
    .run(conn)

  cursor.each(async (_, ch) => {



    const t = Date.now()

    const {
      bid,
      ask,
      origin,
      symbol,
      time
    } = ch.new_val

    const slots = await Slots.getAllOpen(focusArea)

    const buySlots = H.renderSlotsToBuy(opts, ask, slots)

    await Promise.all(
      map(Slots.buy({ origin, symbol }), buySlots)
    )

    const sellSlots = H.renderSlotsToSell(opts, bid, slots)

    await Promise.all(
      map(slot => {
        slot.closeTime = new Date()
        slot.closePrice = bid
        return LadderTable
          .get(slot.id)
          .update(slot)
          .run(conn)
      }, sellSlots)
    )

    // console.log(slots.map(prop('openPrice')))
  })

}

run()
