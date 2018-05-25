<template lang="pug">
  el-cascader(
    :options="options"
    v-model="selected"
    @change="handleChange"
    placeholder="Broker / symbol")
</template>

<script>
import {
  groupBy,
  prop,
  map,
  compose,
  toPairs,
  applySpec,
  identity,
  head,
  last
} from 'ramda'

const props = {
  targets: Array,
  value: Object
}

const computed = {
  options () {
    const symbolsByBrokers = compose(
      map(map(prop('symbol'))),
      groupBy(prop('broker'))
    )

    const childFromSymbol = applySpec({
      value: identity,
      label: identity
    })

    const optionFromPair = applySpec({
      value: head,
      label: head,
      children: compose(map(childFromSymbol), last)
    })

    const compile = compose(
      map(optionFromPair),
      toPairs,
      symbolsByBrokers
    )

    return compile(this.targets)
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
  name: 'target-cascader',
  props,
  data,
  methods,
  computed
}
</script>
