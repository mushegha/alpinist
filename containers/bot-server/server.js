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
 * Helpers
 */

const isRelevant = assoc('closeAt', null)

const sortByPrice = sortBy(path(['openAt', 'ask']))

const formatUnion = ({ right, left }) =>
  assoc('openAt', right, left)


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

    const newTick = ch.new_val
    const oldTick = ch.old_val

    const cursor = await Ladder
      .filter(isRelevant(focusArea))
      .eqJoin('openAt', Ticker)
      .run(conn)

    const slots = await cursor
      .toArray()
      .then(map(formatUnion))
      .then(sortByPrice)

    /**
     * Should buy
     */

    if (slots.length === 0) {
      const newSlot = merge({
        investment : investment,
        openAt     : newTick.id,
        closeAt    : null,
        timestamp  : rt.now()
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }
    else if (head(slots).openAt.ask - treshold >= newTick.ask) {
      const newSlot = merge({
        investment : investment,
        openAt     : newTick.id,
        closeAt    : null,
        timestamp  : rt.now()
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }
    else if (last(slots).openAt.ask + treshold <= newTick.ask) {
      const newSlot = merge({
        investment : investment,
        openAt     : newTick.id,
        closeAt    : null,
        timestamp  : rt.now()
      }, focusArea)

      await Ladder
        .insert(newSlot)
        .run(conn)
    }

    const group = groupBy(slot => {
      return slot.openAt.ask < newTick.bid
        ? 'profit'
        : 'loss'
    }, slots)

    if (group.profit && group.profit.length >= minSellCount
      && group.loss && group.loss.length >= minKeepCount) {

      const selling = take(minSellCount, group.profit)
      const ids = map(prop('id'), selling)

      ids.forEach(id => {
        Ladder
          .get(id)
          .update({ closeAt: newTick.id })
          .run(conn)
      })
    }

    console.log(slots.map(path(['openAt', 'ask'])))
  })

}

run()
