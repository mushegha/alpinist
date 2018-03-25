import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapState
} from 'vuex'

import {
  pick,
  reverse
} from 'ramda'


const components = {
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
  ...mapActions('config', ['fetch'])
}

const computed = {
  ...mapState(['config'])
}

export default {
  components,
  subscriptions,
  methods,
  computed
}
