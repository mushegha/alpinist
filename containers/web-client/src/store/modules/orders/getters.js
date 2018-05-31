import {
  filter,
  propEq,
  values
} from 'ramda'

function ofAgent (state, { asArray }) {
  return agent => {
    const pred = propEq('agent', agent.id || agent)
    return filter(pred, asArray)
  }
}

export {
  ofAgent,
  values as asArray
}
