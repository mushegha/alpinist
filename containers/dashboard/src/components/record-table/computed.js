import {
  map,
  assoc,
  filter,
  compose
} from 'ramda'

import { format } from 'date-fns'

const toFixed = k => x =>
  x ? x.toFixed(8)
    : x

const toFixed8 = x =>
  x ? x.toFixed(8, x)
    : x

const toFixed2 = x =>
  x ? x.toFixed(2, x)
    : x

const timeOf = x =>
  x ? format(new Date(x.mts), 'HH:mm:ss')
    : x

export function all () {
  const pred = row => {
    return !(this.hideHistory && row.orderClose)
  }

  return filter(pred, this.rows)
}

export function data () {
  const transform = record => {
    const {
      tickerOpen,
      orderOpen,
      tickerClose,
      orderClose
    } = record

    const priceOpen = orderOpen.price

    const amount = orderOpen.amount
    const investment = amount * priceOpen

    const base = {
      priceOpen,
      amount: toFixed8(amount),
      investment: toFixed2(investment),
      timeOpen: timeOf(tickerOpen)
    }

    if (tickerClose) {
      base.priceClose = orderClose.price
      base.timeClose = timeOf(tickerClose)

      const profit = orderClose.price * amount - investment
      base.profit = toFixed2(profit)
    }

    return base
  }

  return map(transform, this.all)
}

export function classOf () {
  return row => {
    if (!row.profit) return ''

    return row.profit < 0
      ? 'is-danger'
      : 'is-success'
  }
}
