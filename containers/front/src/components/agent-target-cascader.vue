<template lang="pug">
  el-form-item(label="Target symbol")
    el-cascader(
      :options="options"
      v-model="selected"
      @change="handleChange"
      placeholder="Broker / symbol")
</template>

<script>

const props = {
  value: Object
}

function data () {
  const options = [
    {
      value: 'bitfinex',
      label: 'Bitfinex',
      children: [
        {
          value: 'ethusd',
          label: 'ETHUSD'
        }, {
          value: 'btcusd',
          label: 'BTCUSD'
        }
      ]
    }, {
      value: 'cexio',
      label: 'CEX.io',
      children: [
        {
          value: 'ethusd',
          label: 'ETHUSD'
        }
      ]
    }
  ]
  return {
    options,
    selected: []
  }
}

const methods = {
  handleChange (res) {
    const [ broker, symbol ] = res
    this.$emit('input', { broker, symbol })
  }
}

export default {
  name: 'target-cascader',
  props,
  data,
  methods
}
</script>
