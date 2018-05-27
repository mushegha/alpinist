<template lang="pug">
  el-table(
    v-if="dataset"
    :data="dataset")

    el-table-column(type="expand")
      template(slot-scope="props")
        pre
          code {{ props.row }}

    el-table-column(
      label="Broker"
      prop="broker"
      :filters="filtersFor('broker')"
      :filter-method="filterHandler")

    el-table-column(
      label="Symbol"
      prop="symbol"
      :filters="filtersFor('symbol')"
      :filter-method="filterHandler")

    el-table-column(
      label="Bid"
      align="center")

      el-table-column(
        label="Price"
        align="center"
        prop="bidPrice"
        :sortable="true")

      el-table-column(
        label="Volume"
        align="center"
        prop="bidVolume")

    el-table-column(
      label="Ask"
      align="center")

      el-table-column(
        label="Price"
        align="center"
        prop="askPrice"
        :sortable="true")

      el-table-column(
        label="Volume"
        align="center"
        prop="askVolume")

    el-table-column(
      label="Updated"
      align="right"
      prop="time"
      :formatter="dateFormatter")
</template>

<style>
.is-best {
  background: #ddffdd;
}
</style>

<script>
import { mapGetters } from 'vuex'

import {
  distanceInWords,
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

const methods = {
  dateFormatter (row, col) {
    const time = row.time
    const now = Date.now()

    return now - time > 5 * 60 * 1e3
      ? formatDate(time, 'HH:mm:ss')
      : distanceInWords(time, now, { includeSeconds: true })
  },
  filterHandler (val, row, col) {
    const { property } = col
    return row[property] === val
  }
}

export default {
  name: 'ticker-table',
  computed,
  methods
}
</script>
