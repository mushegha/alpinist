<template lang="pug">
  el-table(
    v-if="tickers"
    :data="tickers"
    stripe)

    el-table-column(type="expand")
      template(slot-scope="props")
        pre
          code {{ props.row }}

    el-table-column(
      label="Broker"
      prop="broker"
      sortable)

    el-table-column(
      label="Symbol"
      prop="symbol")

    el-table-column(
      label="Bid Price"
      prop="ticker.bid_price")

    el-table-column(
      label="Ask Price"
      prop="ticker.ask_price")
</template>

<script>
import { mapState } from 'vuex'

const computed = {
  ...mapState([
    'tickers'
  ])
}

const props = {
  dataset: Array
}

export default {
  name: 'ticker-table',
  props,
  computed
}
</script>
