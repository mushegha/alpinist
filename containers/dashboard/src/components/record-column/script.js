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
  reduce
} from 'ramda'

import RecordStats from '@/record-stats'
import RecordTable from '@/record-table'


const components = {
  RecordStats,
  RecordTable
}

const props = ['trader']

function subscriptions () {
  const fromRemote = () =>
    this.fetchOpen(this.trader)

  const stream = Observable
    .timer(0, 2000)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, identity)
}

const methods = {
  ...mapActions('record', ['fetchOpen'])
}

const computed = {
  count () {
    return this.rows.length
  },
  amount () {
    const sum = (acc, row) => {
      return acc + row.amount
    }

    return reduce(sum, 0, this.rows)
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
