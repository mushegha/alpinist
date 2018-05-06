const R = require('ramda')

const { ulid } = require('ulid')

const SOURCE_FIELDS = [
  'subject',
  'operation',
  'kind',
  'exchange',
  'symbol',
  'quantity',
  'price'
]

const bodyLens = R.lensPath(['request', 'body'])

const subjectLens = R.lensProp('subject')
const statusLens = R.lensProp('status')

const fromContext = R.compose(
  R.over(subjectLens, ulid),
  R.over(statusLens, R.always('new')),
  R.pick(SOURCE_FIELDS),
  R.view(bodyLens)
)

function create () {
  return async (ctx, next) => {
    ctx.body = fromContext(ctx)

    return next()
  }
}

module.exports = create
