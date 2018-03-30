import { Observable } from 'rxjs/Observable'

import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

import {
  isEmpty,
  identity
} from 'ramda'

import RecordColumn from '@/record-column'
import TickerStatus from '@/ticker-status'
import TraderPanel from '@/trader-panel'

// import TickerPanel from '@/ticker-panel'
// import LadderPanel from '@/ladder-panel'
// import TraderPanel from '@/config-panel'

const props = ['id']

const components = {
  RecordColumn,
  TickerStatus,
  TraderPanel
}

const computed = {
  isLoaded () {
    return !isEmpty(this.body)
  },
  ...mapGetters(['activeScope']),
  ...mapState({ body: 'trader' })
}

const methods = {
  ...mapActions('trader', ['fetchOne'])
}

function beforeMount () {
  this.fetchOne(this.id)
}

export default {
  name: 'view-traders-one',
  props,
  components,
  methods,
  computed,
  beforeMount
}
