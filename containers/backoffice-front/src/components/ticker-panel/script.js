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
    this.fetch(this.target.query)

  const stream = Observable
    .timer(0, 800)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, _ => _)
}

const watch = {
  target () {
    this.erase()
  }
}

const methods = {
  ...mapActions('ticker', ['fetch']),
  ...mapMutations('ticker', { erase: 'ERASE' })
}

const computed = mapGetters('ticker', ['last'])

export default {
  components,
  props,
  computed,
  methods,
  mounted,
  watch
}
