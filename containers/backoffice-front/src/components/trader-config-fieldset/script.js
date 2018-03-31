import * as computed from './computed'

import * as methods from './methods'

const props = {
  value: {
    type: Object,
    default () {
      return {}
    }
  }
}

function data () {
  return {
    input: {}
  }
}

function beforeMount () {
  this.setValues(this.value)
}

export default {
  name: 'trader-config-fieldset',
  props,
  data,
  computed,
  beforeMount,
  methods
}
