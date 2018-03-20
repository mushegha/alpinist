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

/**
 * Mocks
 */

const focusArea = {
  pair: 'btcusd',
  provider: 'bitfinex'
}

const investment = 100
const treshold = 5

const minSellCount = 2
const minKeepCount = 1

async function run () {
  const conn = await rt.connect()

  const Ticker = rt
    .db('alpinist')
    .table('ticker')

  const Ladder = rt
    .db('alpinist')
    .table('ladder')

  const cursor = await Ticker
    .orderBy({ index: rt.desc('timestamp') })
    .filter({ pair: 'btcusd', provider: 'bitfinex' })
    .limit(1)
    .changes()
    .run(conn)

  cursor.each(async (_, ch) => {
    const t = Date.now()

    const { bid, ask } = ch.new_val

    const cursor = await Ladder
      .filter(focusArea)
      .filter(rt.row.hasFields('closePrice').not())
      .orderBy('openPrice')
      .run(conn)

    const slots = await cursor.toArray()

    /**
     * Should buy
     */

    if (slots.length === 0) {
      const newSlot = merge({
        investment : investment,
        openTime   : rt.now(),
        openPrice  : ask,
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }
    else if (head(slots).openPrice - treshold >= ask) {
      const newSlot = merge({
        investment : investment,
        openTime   : rt.now(),
        openPrice  : ask,
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }
    else if (last(slots).openPrice + treshold <= ask) {
      const newSlot = merge({
        investment : investment,
        openTime   : rt.now(),
        openPrice  : ask,
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }

    const group = groupBy(slot => {
      return slot.openPrice < bid
        ? 'profit'
        : 'loss'
    }, slots)

    if (group.profit && group.profit.length >= minSellCount
      && group.loss && group.loss.length >= minKeepCount) {

      const selling = take(minSellCount, group.profit)
      const ids = map(prop('id'), selling)

      const patch = {
        closeTime  : rt.now(),
        closePrice : bid
      }

      ids.forEach(id => {
        Ladder
          .get(id)
          .update(patch)
          .run(conn)
      })
    }

    console.log(slots.map(prop('openPrice')))
  })

}

run()
