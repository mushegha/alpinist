import { mapState } from 'vuex'

import {
  map,
  props,
  compose,
  prepend,
  evolve
} from 'ramda'

const HEADER = [ 'dateCreated', 'bid', 'ask' ]

const toRows = compose(
  prepend(HEADER),
  map(props(HEADER)),
  map(evolve({ dateCreated: t => new Date(t) })),
)

export function rows () {
  return toRows(this.history)
}

export const { history } = mapState({ history: 'ticker' })
