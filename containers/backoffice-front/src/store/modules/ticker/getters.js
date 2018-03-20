import * as R from 'ramda'

const status = R.compose(
  R.defaultTo({}),
  R.last
)

// const bid = R.compose(
//   R.prop('bid'),
//   R.last
// )
//
// const ask = R.compose(
//   R.prop('ask'),
//   R.last
// )

export {
  status
  // bid,
  // ask
}
