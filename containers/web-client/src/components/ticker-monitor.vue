<template lang="pug">
  div(v-if="model")
    div {{ target.broker }} / {{ target.symbol }}
    span
      strong Bid
      var {{ model.bid_price }}
    span
      strong Ask
      var {{ model.ask_price }}
</template>

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
