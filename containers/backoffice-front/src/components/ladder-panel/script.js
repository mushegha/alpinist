import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

import {
  pick,
  reverse
} from 'ramda'

import LadderPanelBlock from '@/ladder-panel-block'

const components = {
  LadderPanelBlock
}

function subscriptions () {
  const fromRemote = () =>
    this.fetch()

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, _ => _)
}

const methods = {
  ...mapActions('ladder', ['fetch'])
}

const computed = {
  ...mapState({ slots: 'ladder' }),
  rev () {
    return reverse(this.slots)
  },
  count () {
    return this.slots.length
  }
}

export default {
  components,
  subscriptions,
  methods,
  computed
}
