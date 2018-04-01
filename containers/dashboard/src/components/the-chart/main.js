import * as computed from './computed'

import { mounted, beforeMount } from './hooks'

export default {
  name: 'the-chart',
  props: ['value'],
  computed,
  // hooks
  beforeMount,
  mounted
}
