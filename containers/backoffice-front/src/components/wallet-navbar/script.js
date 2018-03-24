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


function subscriptions () {
  const fromRemote = () =>
    this.fetch()

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, _ => _)
}

const methods = {
  ...mapActions('wallet', ['fetch'])
}

const computed = {
  ...mapState(['wallet'])
}

export default {
  subscriptions,
  methods,
  computed
}
