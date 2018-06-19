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

const fromTarget = state => {
  return target => {
    // console.log(target)
    //
    const { broker, symbol } = target
    const id = `${broker}-${symbol}`

    return state && state[id]
  }
}

export {
  byBrokers,
  fromTarget,
  values as asArray
}
