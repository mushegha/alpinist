import * as R from 'ramda'

const bid = R.compose(
  R.prop('bid'),
  R.last
)

const ask = R.compose(
  R.prop('ask'),
  R.last
)

export {
  bid,
  ask
}
