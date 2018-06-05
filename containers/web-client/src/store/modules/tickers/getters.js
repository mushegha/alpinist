import {
  groupBy,
  prop,
  values,
  compose
} from 'ramda'

const byBrokers = compose(
  groupBy(prop('broker')),
  values
)

export {
  byBrokers,
  values as asArray
}
