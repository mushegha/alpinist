import { mapGetters } from 'vuex'

import RecordColumn from '@/record-column'
import TickerStatus from '@/ticker-status'


// import TickerPanel from '@/ticker-panel'
// import LadderPanel from '@/ladder-panel'
// import ConfigPanel from '@/config-panel'

const props = ['id']

const components = {
  RecordColumn,
  TickerStatus
}

const computed = {
  symbol () {
    return 'ethusd'
  },
  ...mapGetters(['activeScope'])
}

export default {
  name: 'view-traders-one',
  props,
  components,
  computed
}
