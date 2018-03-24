import { mapGetters } from 'vuex'

import TickerPanel from '@/ticker-panel'
import LadderPanel from '@/ladder-panel'

const components = {
  TickerPanel,
  LadderPanel
}

const computed = mapGetters(['activeScope'])

export default {
  name: 'the-dashboard-view',
  components,
  computed
}
