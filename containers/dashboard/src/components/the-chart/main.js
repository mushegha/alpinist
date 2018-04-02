import * as computed from './computed'

import * as methods from './methods'

import { mounted, beforeMount } from './hooks'

export default {
  name: 'the-chart',
  props: ['value'],
  computed,
  methods,
  // hooks
  beforeMount,
  mounted
}
