import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

import {
  pick,
  reverse,
  identity,
  reduce,
  filter
} from 'ramda'

import TheChart from '@/the-chart'
import RecordTable from '@/record-table'


const components = {
  TheChart,
  RecordTable
}

const props = ['trader']

function subscriptions () {
  const fromRemote = () =>
    this.fetchAllOf(this.trader)

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, identity)
}

const methods = {
  ...mapActions('record', ['fetchAllOf'])
}

const computed = {
  open () {
    return filter(x => !x.tickerClose, this.rows)
  },
  count () {
    return this.rows.length
  },
  amount () {
    const sum = (acc, row) => {
      return acc + row.amount
    }

    return reduce(sum, 0, this.open)
  },
  ...mapState({ rows: 'record' })
}

export default {
  props,
  components,
  subscriptions,
  methods,
  computed
}
