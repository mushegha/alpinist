import * as computed from './computed'

import * as methods from './methods'

import { mounted, beforeMount } from './hooks'

const watch = {
  data () {
    this.render()
  }
}

export default {
  name: 'the-chart',
  props: ['value'],
  computed,
  watch,
  methods,
  // hooks
  beforeMount,
  mounted
}
