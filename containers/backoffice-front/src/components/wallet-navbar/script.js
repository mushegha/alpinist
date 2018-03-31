import { Observable } from 'rxjs/Observable'

import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

import {
  identity,
  compose,
  map,
  zipObj,
  toPairs,
  toUpper
} from 'ramda'


function subscriptions () {
  const fromRemote = () =>
    this.fetch()

  const stream = Observable
    .timer(0, 10e3)
    .flatMap(fromRemote)

  this.$subscribeTo(stream, identity)
}

const methods = {
  ...mapActions('wallet', ['fetch'])
}

const computed = {
  rows () {
    const fields = ['currency', 'balance']

    const transform = compose(
      map(zipObj(fields)),
      toPairs
    )

    return transform(this.wallet)
  },
  ...mapState(['wallet'])
}

const filters = {
  toUpper (val) {
    return val.toUpperCase()
  }
}

export default {
  subscriptions,
  methods,
  computed,
  filters
}
