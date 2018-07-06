<template lang="pug">
div
  el-button(type="primary"
    @click="generate")
    | Export CSV
</template>

<script>

import { format as formatDate } from 'date-fns'

const props = {
  id: String,
  ticker: Object,
  dataset: Array }

function toCSV (rows) {
  const FIELDS = [
    'ID',
    'Invest',
    'Buy price',
    'Date of buy',
    'Buy status',
    'Date of sell',
    'Sell price',
    'Sell status',
    'Profit'
  ]

  const head = FIELDS.join(',')
  const body = rows
    .map(row => row.join(','))
    .join('\n')

  const pre = 'data:text/csv;charset=utf-8,'

  const content = `${pre}\n${head}\n${body}`

  return encodeURI(content);
}

function forceDownload (name, content) {
  const link = document.createElement('a')
  link.setAttribute('href', content)
  link.setAttribute('download', `${name}.csv`)
  document.body.appendChild(link) // Required for FF
  link.click()
  document.body.removeChild(link)
}

const methods = {
  generate () {
    const asDate = t => new Date(t).toString()
    const asFin = x => Number(x).toFixed(2)
    const asAmt = x => Number(x).toFixed(4)

    const fromRow = row => {
      const {
        id, side,
        quantity,
        buy_price, buy_time, buy_status, buy_info,
        sell_price, sell_time, sell_status, sell_info,
      } = row

      const buyArr = [
        asFin(buy_price),
        asDate(buy_time),
        buy_status
      ]

      const sellArr = [
        asDate(sell_time),
        asFin(sell_price),
        sell_status
      ]

      const profit = quantity * (sell_price - buy_price)

      return [
        id,
        asFin(buy_price * quantity),
        ...buyArr,
        ...sellArr,
        asFin(profit)
      ]
    }

    const rows = this.dataset
      .filter(x => x.side === 'sell')
      .map(fromRow)

    const { id } = this
    const { broker, symbol } = this.ticker

    const name = `${id}(${broker}_${symbol})`

    const content = toCSV(rows)
    forceDownload(name, content)
  }
}

export default {
  name: 'order-export',
  props,
  methods
}
</script>

