import { Observable } from 'rxjs/Observable'

import { mapActions, mapGetters } from 'vuex'

import { pick } from 'ramda'

const props = ['target']

function mounted () {
  const stream = Observable
    .interval(500)

  this.$subscribeTo(stream, _ => _)
}

const methods = {}
const computed = mapGetters('ticker', ['scope'])

export default {
  props,
  computed,
  methods,
  mounted
}
