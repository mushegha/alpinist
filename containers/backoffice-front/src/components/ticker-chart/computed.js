import { mapGetters } from 'vuex'

import {
  map,
  props,
  evolve,
  compose,
  uniqBy,
  prop,
  prepend
} from 'ramda'

const HEADER = [ 'time', 'bid', 'ask' ]

const toRow = compose(
  props(HEADER),
  evolve({
    time: t => new Date(t)
  })
)

const toRows = compose(
  prepend(HEADER),
  map(toRow),
  uniqBy(prop('time'))
)

function rows () {
  return toRows(this.scope)
}

const { scope } = mapGetters('ticker', ['scope'])

export {
  rows,
  scope
}
