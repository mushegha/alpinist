const debug = require('debug')('alpinist:orders:sync')

const {
  assoc,
  both,
  either,
  identity,
  tap,
  dissoc,
  propEq,
  complement
} = require('ramda')

const Channel = require('./lib/channel')

const Store = require('./lib/store')

/**
 * Helpers
 */

const isBuyOrder = propEq('side', 'buy')

const isSellOrder = propEq('side', 'sell')

const isNewBuy = both(
  isBuyOrder,
  propEq('buy_status', 'new')
)

const isNewSell = both(
  isSellOrder,
  propEq('sell_status', 'new')
)

const isNew = either(isNewBuy, isNewSell)

const isClosed = propEq('status', 'closed')

const orderFrom = slot => {
  const price = isBuyOrder(slot)
    ? slot.buy_price
    : slot.sell_price

  return assoc('price', price, slot)
}

/**
 *
 */

const source = Channel.Observable()

const sink = Channel.Observer()

const store = new Store()

/**
 *
 */

source
  .filter(isClosed)
  .subscribe(order => {
    debug('Order details: %O', order)

    const { id, side, price, status } = order

    const slotProps = {
      id,
      side
    }

    if (side === 'buy') {
      slotProps.buy_price = price
      slotProps.buy_status = status
    } else {
      slotProps.sell_price = price
      slotProps.sell_status = status
    }

    store
      .putOrder(slotProps)
      .then(_ => debug('Updated %s to %s %s', id, side, status))
  })

/**
 *
 */

store
  .source()
  .filter(isNew)
  .map(orderFrom)
  // .map(tap(x => debug('Received %s', x.id)))
  .subscribe(sink)
  // .subscribe(console.log)

/**
 *
 */

store
  .source()
  .subscribe(order => {
    debug('Order snapshot received: %s', order.side, order.status)
  })
