import { mapGetters } from 'vuex'

import TickerPanel from '@/ticker-panel'
// import LadderStatus from '@/ladder-status'

const components = {
  TickerPanel,
  // LadderStatus
}

const computed = mapGetters(['activeScope'])

export default {
  name: 'the-dashboard-view',
  components,
  computed
}
