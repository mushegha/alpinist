import {
  groupBy,
  prop
} from 'ramda'

const byBroker = groupBy(prop('broker'))

export {
  byBroker
}
