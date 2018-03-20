import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick } from 'ramda'

const props = ['provider', 'pair']

function mounted () {
  const params = pick(props, this)

  const stream = Observable
    .interval(400)
    .flatMap(_ => this.fetch(params))

  this.$subscribeTo(stream, _ => _)
}

const methods = mapActions('ticker', ['fetch'])
const computed = mapGetters('ticker', ['status'])

export default {
  props,
  computed,
  methods,
  mounted
}
