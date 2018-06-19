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

const {
  OrdersObservable,
  OrdersObserver
} = require('./lib/channel')

const { Orders } = require('./lib/store')

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

const isNotNew = complement(propEq('status', 'new'))


const orderFrom = slot => {
  const price = isBuyOrder(slot)
    ? slot.buy_price
    : slot.sell_price

  return assoc('price', price, slot)
}

/**
 *
 */

const source = new OrdersObservable()

const sink = new OrdersObserver()

const store = new Orders()

/**
 *
 */

source
  .map(tap(x => debug('Snapshot: %O', x)))
  .filter(isNotNew)
  .map(tap(x => debug('Snapshot: %s', x.id)))
  .subscribe(order => {
    debug('Order details: %O', order)

    const {
      id,
      side,
      price,
      status,
      info
    } = order

    const slotProps = {
      id,
      side
    }

    if (side === 'buy') {
      slotProps.buy_price = price
      slotProps.buy_status = status
      slotProps.buy_info = info
    } else {
      slotProps.sell_price = price
      slotProps.sell_status = status
      slotProps.sell_info = info
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
  .subscribe(sink)

/**
 *
 */

// store
//   .source()
//   .subscribe(order => {
//     debug('Order snapshot received: %s %s', order.side, order.status)
//   })
