<template lang="pug">
  el-table(
    v-if="dataset"
    :data="dataset"
    :row-style="rowStyle"
    stripe)

    el-table-column(type="expand")
      template(slot-scope="props")
        pre
          code {{ props.row }}

    el-table-column(
      label="Id"
      prop="id"
      align="left"
      :sortable="true")

      template(slot-scope="scope")
        pre
          var {{ scope.row.id | truncate }}

    el-table-column(
      label="Quantity"
      prop="quantity"
      align="center"
      :sortable="true")

      template(slot-scope="scope")
        var {{ scope.row.quantity | asQuantity }}

    el-table-column(
      label="Buy Price"
      prop="buy_price"
      align="center"
      :sortable="true")

      template(slot-scope="scope")
        var {{ scope.row.buy_price | asPrice }}

    el-table-column(
      label="Sell Price"
      prop="sell_price"
      align="center"
      :sortable="true")

      template(slot-scope="scope")
        var(v-if="scope.row.sell_price")
          | {{ scope.row.sell_price | asPrice }}

    el-table-column(
      label="Side"
      prop="side"
      :filters="filtersFor('side')"
      :filter-method="filterHandler")

    el-table-column(label="Profit")
      template(slot-scope="scope")
        | {{ profitOf(scope.row) }}

    el-table-column(
      label="Operations"
      align="right")
      template(slot-scope="scope")
        el-button(
          size="mini"
          v-if="scope.row.side === 'buy'"
          type="primary"
          @click="sell(scope.row)")
          | Sell

    el-table-column(
      label="Updated"
      align="right"
      prop="time"
      :sortable="true")

      template(slot-scope="scope")
        time {{ scope.row.time | asStandardTime }}
</template>

<script>

import { mapActions } from 'vuex'

import { format as formatDate } from 'date-fns'

import {
  map,
  prop,
  compose,
  applySpec,
  uniq,
  identity
} from 'ramda'

const props = {
  dataset: Array,
  ticker: Object
}

const filters = {
  asStandardTime (time) {
    return formatDate(time, 'HH:mm:ss')
  },
  asPrice (x) {
    return Number(x).toFixed(2)
  },
  asQuantity (x) {
    return Number(x).toFixed(4)
  },
  truncate (str) {
    return str.length > 12
      ? str.slice(0, 6) + '…' + str.slice(-6)
      : str
  }
}

const computed = {
  filtersFor () {
    const fromValue = applySpec({
      text: identity,
      value: identity
    })

    return key => {
      const compile = compose(
        map(fromValue),
        uniq,
        map(prop(key))
      )

      return compile(this.dataset)
    }
  },
  rowStyle () {
    return x => {
      const { status, side } = x.row

      /**
      if (status === 'new') {
        return 'background-color: rgba(230, 162, 60, 0.09);'
      } else if (status === 'rejected') {
        return 'background-color: rgba(245, 108, 108, 0.09);'
      }
      */

      if (side === 'buy') {
        return 'background-color: rgba(64, 158, 255, 0.09);'
      }

      return ''
    }
  },
  profitOf () {
    return x => {
      const { ticker } = this
      if (x.side === 'buy' && !ticker) {
        return ''
      }

      const {
        quantity,
        buy_price
      } = x

      const sell_price = x.side === 'buy'
        ? ticker.bid_price
        : x.sell_price

      const profit = quantity * (sell_price - buy_price)

      return profit.toFixed(2)
    }
  }
}

const methods = {
  filterHandler (val, row, col) {
    const { property } = col
    return row[property] === val
  },
  ...mapActions({
    sell: 'orders/sell'
  })
}

export default {
  name: 'slot-table',
  props,
  computed,
  filters,
  methods
}
</script>

<style>
.bg-status-new {
  background-color: #E6A23C;
}

.bg-status-rejected {
  background-color: #FF0044;
}
</style>
