import {
  propEq,
  find,
  head
} from 'ramda'

export function activeScope (state) {
  const { scopes, route } = state
  const pred = propEq('data', route.query)

  return find(pred, scopes) || head(scopes)
}
