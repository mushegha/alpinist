import TickerStatus from '@/ticker-status'
import LadderStatus from '@/ladder-status'

const components = {
  TickerStatus,
  LadderStatus
}

const props = [
  'provider',
  'pair'
]

export default {
  name: 'symbol-scope-view',
  components,
  props
}
