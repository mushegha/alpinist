import {
  propEq,
  find,
  head
} from 'ramda'

export function activeScope (state) {
  const { scopes, route } = state
  const pred = propEq('query', route.query)

  return find(pred, scopes) || head(scopes)
}
