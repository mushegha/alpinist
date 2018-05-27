<template lang="pug">
  el-cascader(
    :options="options"
    v-model="selected"
    @change="handleChange"
    placeholder="Broker / symbol")
</template>

<script>
import { mapGetters } from 'vuex'

import {
  prop,
  map,
  compose,
  toPairs,
  toUpper,
  applySpec,
  head,
  last
} from 'ramda'

const props = {
  value: Object
}

const getters = mapGetters({
  hierarchy: 'tickers/byBroker'
})

const computed = {
  ...getters,
  options () {
    const childFromTicker = applySpec({
      value: prop('symbol'),
      label: compose(toUpper, prop('symbol'))
    })

    const optionFromPair = applySpec({
      value: head,
      label: head,
      children: compose(
        map(childFromTicker),
        last
      )
    })

    const compile = compose(
      map(optionFromPair),
      toPairs
    )

    return compile(this.hierarchy)
  }
}

function data () {
  return {
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
  name: 'ticker-cascader',
  props,
  data,
  methods,
  computed
}
</script>
