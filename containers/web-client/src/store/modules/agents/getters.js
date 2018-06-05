import {
  values
} from 'ramda'

const byId = state => id => state[id]

export {
  byId,
  values as asArray
}
