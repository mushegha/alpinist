<template lang="pug">
  el-table(
    v-if="dataset"
    :data="dataset")

    el-table-column(
      label="Broker"
      prop="broker"
      :filters="filtersFor('broker')"
      :filter-method="filterHandler")

    el-table-column(
      label="Symbol"
      prop="symbol")

    el-table-column(
      label="Bid"
      align="center")

      el-table-column(
        label="Price"
        align="center"
        prop="bid_price"
        :sortable="true")

      el-table-column(
        label="Volume"
        align="center"
        prop="bid_quantity")

    el-table-column(
      label="Ask"
      align="center")

      el-table-column(
        label="Price"
        align="center"
        prop="ask_price"
        :sortable="true")

      el-table-column(
        label="Volume"
        align="center"
        prop="ask_quantity")

    el-table-column(
      label="Updated"
      align="right")

      template(slot-scope="scope")
        time {{ scope.row.ts | asTime }}
</template>

<style>
.is-best {
  background: #ddffdd;
}
</style>

<script>
import { Observable } from 'rxjs/Rx'

import { mapGetters } from 'vuex'

import {
  format as formatDate
} from 'date-fns'

import {
  map,
  prop,
  compose,
  applySpec,
  uniq,
  identity
} from 'ramda'

const subscriptions = {
  time: Observable
    .timer(0, 1000)
    .map(_ => Date.now())
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
  ...mapGetters({
    dataset: 'tickers/asArray'
  })
}

const filters = {
  asTime (time) {
    return formatDate(time, 'HH:mm:ss')
  }
}

const methods = {
  filterHandler (val, row, col) {
    const { property } = col
    return row[property] === val
  }
}

export default {
  name: 'ticker-table',
  computed,
  methods,
  subscriptions,
  filters
}
</script>
