const rt = require('rethinkdb')

const {
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

  const Ladder = rt
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

    const cursor = await Ladder
      .filter(focusArea)
      .filter(rt.row.hasFields('closePrice').not())
      .orderBy('openPrice')
      .run(conn)

    const slots = await cursor.toArray()


    const buySlots = H.renderSlotsToBuy(opts, ask, slots)

    await Promise.all(
      map(slot => {
        slot.time = new Date()
        slot.origin = origin
        slot.symbol = symbol
        return Ladder
          .insert(slot)
          .run(conn)
      }, buySlots)
    )

    const sellSlots = H.renderSlotsToSell(opts, bid, slots)
    console.log(sellSlots)

    //
    // if (group.profit && group.profit.length >= minSellCount
    //   && group.loss && group.loss.length >= minKeepCount) {
    //
    //   const selling = take(minSellCount, group.profit)
    //   const ids = map(prop('id'), selling)
    //
    //   const patch = {
    //     closeTime  : rt.now(),
    //     closePrice : bid
    //   }
    //
    //   ids.forEach(id => {
    //     Ladder
    //       .get(id)
    //       .update(patch)
    //       .run(conn)
    //   })
    // }

    console.log(slots.map(prop('openPrice')))
  })

}

run()
