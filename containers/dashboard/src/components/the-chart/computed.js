import {
  reduce,
  concat,
  filter,
  compose,
  map,
  props,
  chain,
  reject,
  isNil,
  uniqBy,
  prop,
  sortBy
} from 'ramda'

/**
 * Helpers
 */

const tOf = prop('timestamp')

const compactTickers = compose(
  uniqBy(prop('timestamp')),
  reject(isNil)
)

const sortedTickersFrom = compose(
  sortBy(prop('timestamp')),
  compactTickers,
  chain(props(['tickerOpen', 'tickerClose']))
)

const isOpenAt = t => record => {
  const { tickerOpen, tickerClose } = record

  const started = t >= tOf(tickerOpen)
  const notEnded = tickerClose
    ? t < tOf(tickerClose)
    : true

  return started && notEnded
}

const isOpenedBefore = t => record => {
  return t >= tOf(record.tickerOpen)
}

/**
 * Getters
 */

export function assets () {
  const { value } = this

  const recordsBy = pred => filter(pred, value)

  const recordsAt = ticker => {
    const t = tOf(ticker)

    function toRow (record) {
      const { amount, price } = record.orderOpen

      return {
        t,
        type: 'assets',
        worth: amount * ticker.bid,
        price: price
      }
    }

    return map(toRow, recordsBy(isOpenAt(t)))
  }

  return chain(recordsAt, sortedTickersFrom(value))
}

export function money () {
  const { value } = this

  const recordsBy = pred => filter(pred, value)


  const moneyAt = ticker => {
    const t = tOf(ticker)

    function toRow (acc, record) {
      const { orderOpen, orderClose, tickerClose } = record

      const sub = orderOpen.price * orderOpen.amount

      const add = orderClose && (tickerClose.timestamp <= t)
        ? orderClose.price * orderOpen.amount
        : 0

      return {
        t,
        type: 'money',
        worth: acc.worth - sub + add
      }
    }

    const xx = {
      worth: 0,
      type: 'money'
    }

    return reduce(toRow, xx, recordsBy(isOpenedBefore(t)))
  }

  const tickers = sortedTickersFrom(value)

  return map(moneyAt, tickers)
}

export function data () {
  const { assets, money } = this

  return concat(assets, money)
}
