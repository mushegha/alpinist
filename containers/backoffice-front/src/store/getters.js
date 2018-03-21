import { head } from 'ramda'

export function activeScope (state) {
  return head(state.scopes)
}
