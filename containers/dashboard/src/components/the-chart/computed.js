import {
  uniq,
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
  sortBy,
  take,
  toUpper
} from 'ramda'

/**
 * Helpers
 */

const tOf = prop('mts')

const symbolOf = compose(
  toUpper,
  take(3),
  prop('symbol')
)

const compactTickers = compose(
  uniqBy(prop('mts')),
  reject(isNil)
)

const sortedTickersFrom = compose(
  sortBy(prop('mts')),
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

export function moments () {
  return sortedTickersFrom(this.value)
}

export function assets () {
  const { value } = this

  const recordsBy = pred => filter(pred, value)

  const recordsAt = ticker => {
    const t = tOf(ticker)

    function toRow (record) {
      const { amount, price } = record.orderOpen

      return {
        time: t,
        type: symbolOf(ticker),
        worth: amount * ticker.bid,
        price: price
      }
    }

    return map(toRow, recordsBy(isOpenAt(t)))
  }

  return chain(recordsAt, this.moments)
}

export function money () {
  const { value } = this

  const recordsBy = pred => filter(pred, value)

  const moneyAt = time => {
    function toRow (acc, record) {
      const { orderOpen, orderClose, tickerClose } = record

      const sub = orderOpen.price * orderOpen.amount

      const add = orderClose && (tickerClose.mts <= time)
        ? orderClose.price * orderOpen.amount
        : 0

      return {
        time: time,
        worth: acc.worth - sub + add,
        type: 'USD'
      }
    }

    const xx = {
      worth: 0
    }

    return reduce(toRow, xx, recordsBy(isOpenedBefore(time)))
  }

  const getMoments = compose(
    uniq,
    map(prop('time'))
  )

  const moments = getMoments(this.assets)

  return map(moneyAt, moments)
}

export function data () {
  const { assets, money } = this

  return concat(assets, money)
}
