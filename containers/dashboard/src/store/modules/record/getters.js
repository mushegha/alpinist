import {
  join,
  prepend,
  map
} from 'ramda'

const HEAD = [
  'amount',
  'orderOpenId',
  'orderOpenPrice',
  'orderOpenDate',
  'orderCloseId',
  'orderClosePrice',
  'orderCloseDate',
]

const toRow = record => {
  const {
    orderOpen,
    orderClose = {},
    tickerOpen,
    tickerClose = {}
  } = record

  const openDate = new Date(tickerOpen.mts)
  const closeDate = tickerClose.mts
    ? new Date(tickerClose.mts)
    : null

  return [
    orderOpen.amount,
    orderOpen.id,
    orderOpen.price,
    openDate,
    orderClose.id,
    orderClose.price,
    closeDate
  ]
}

export function csv (state) {
  const body = map(toRow, state)
  const data = prepend(HEAD, body)
  return join('\n', data)
}


