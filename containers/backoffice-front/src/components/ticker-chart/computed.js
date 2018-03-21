import { mapGetters } from 'vuex'

import {
  map,
  props,
  compose,
  prepend
} from 'ramda'

const HEADER = [ 'time', 'bid', 'ask' ]

const toRows = compose(
  prepend(HEADER),
  map(props(HEADER))
)

export function rows () {
  return toRows(this.history)
}

export const { history } = mapGetters('ticker', ['history'])
