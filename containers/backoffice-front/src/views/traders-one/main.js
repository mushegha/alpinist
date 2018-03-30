import { mapGetters } from 'vuex'

import RecordColumn from '@/record-column'


// import TickerPanel from '@/ticker-panel'
// import LadderPanel from '@/ladder-panel'
// import ConfigPanel from '@/config-panel'

const props = ['id']

const components = {
  RecordColumn
}

const computed = mapGetters(['activeScope'])

export default {
  name: 'view-traders-one',
  props,
  components,
  computed
}
