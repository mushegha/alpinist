import { mapGetters } from 'vuex'

import TickerPanel from '@/ticker-panel'
import LadderPanel from '@/ladder-panel'
import ConfigPanel from '@/config-panel'

const components = {
  TickerPanel,
  LadderPanel,
  ConfigPanel
}

const computed = mapGetters(['activeScope'])

export default {
  name: 'the-dashboard-view',
  components,
  computed
}
