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
      align="right")

      template(slot-scope="scope")
        time {{ scope.row.time | since(time) }}
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
  distanceInWordsStrict,
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
  since (time, now) {
    return now - time > 5 * 60 * 1e3
      ? formatDate(time, 'HH:mm:ss')
      : distanceInWordsStrict(time, now, { includeSeconds: true })
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
