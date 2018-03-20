import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick } from 'ramda'

const props = ['provider', 'pair']

function mounted () {
  const params = pick(props, this)

  const stream = Observable
    .interval(500)
    .flatMap(_ => this.fetch(params))

  this.$subscribeTo(stream, _ => _)
}

const methods = mapActions('ticker', ['fetch'])
const computed = mapGetters('ticker', ['last'])

export default {
  props,
  computed,
  methods,
  mounted
}
