import {
  map,
  assoc,
  compose
} from 'ramda'

import { format } from 'date-fns'

const toFixed = x =>
  x ? x.toFixed(8)
    : x

const timeOf = x =>
  x ? format(new Date(x.mts), 'HH:mm:ss')
    : x

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
      amount: toFixed(amount),
      investment: toFixed(investment),
      timeOpen: timeOf(tickerOpen)
    }

    if (tickerClose) {
      base.priceClose = orderClose.price
      base.timeClose = timeOf(tickerClose)

      base.profit = investment - orderClose.price * amount
    }

    return base
  }

  return map(transform, this.rows)
}
