import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'

import { pick } from 'ramda'

import TickerChart from '@/ticker-chart'

const components = {
  TickerChart
}

const props = ['target']

function mounted () {
  const fromRemote = () =>
    this.fetch()

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, _ => _)
}

const methods = {
  ...mapActions('ticker', ['fetch'])
}

const computed = mapGetters('ticker', ['last'])

export default {
  components,
  props,
  computed,
  methods,
  mounted
}
