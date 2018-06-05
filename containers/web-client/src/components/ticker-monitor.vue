<template lang="pug">
  div.ticker-monitor(v-if="model")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item
        code {{ target.broker }}
      el-breadcrumb-item
        code {{ target.symbol }}
      el-breadcrumb-item
        code.bid {{ model.bid_price }}
        code.ask {{ model.ask_price }}
</template>

<style scoped>
.ticker-monitor {
  padding-top: 8px;
}

.ticker-monitor .bid {
  padding-right: 10px;
  color: #67C23A;
}

.ticker-monitor .ask {
  padding-right: 10px;
  color: #F56C6C;
}

</style>

<script>
const props = {
  target: Object
}

const computed = {
  model () {
    const { broker, symbol } = this.target
    const id = `${broker}-${symbol}`

    return this.$store.state
      .tickers[id]
  }
}

export default {
  name: 'ticker-monitor',
  props,
  computed
}
</script>
