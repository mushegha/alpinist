import * as computed from './computed'

import * as methods from './methods'

const props = ['id', 'value']

function data () {
  return {
    input: {}
  }
}

export default {
  props,
  data,
  computed,
  methods
}