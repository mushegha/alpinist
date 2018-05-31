<template lang="pug">
  el-table(
    v-if="dataset"
    :data="dataset"
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
      label="Price"
      prop="price"
      align="center"
      :sortable="true")

    el-table-column(
      label="Side"
      prop="side"
      :filters="filtersFor('side')"
      :filter-method="filterHandler")

    el-table-column(
      label="Status"
      prop="status")

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
  dataset: Array
}

const filters = {
  asStandardTime (time) {
    return formatDate(time, 'HH:mm:ss')
  },
  truncate (str) {
    return str.length > 16
      ? str.slice(0, 8) + '…' + str.slice(-8)
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
  name: 'agent-table',
  props,
  computed,
  filters,
  methods
}
</script>
