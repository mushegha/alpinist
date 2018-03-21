import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

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
  target ({ id }) {
    console.log('navigation detected')
  }
}

const methods = mapActions('ticker', ['fetch'])
const computed = mapGetters('ticker', ['last'])

export default {
  components,
  props,
  computed,
  methods,
  mounted,
  watch
}
