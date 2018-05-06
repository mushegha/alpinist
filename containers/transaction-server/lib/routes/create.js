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

const asBuffer = R.compose(
  Buffer.from,
  JSON.stringify
)

function create () {
  return async (ctx, next) => {
    ctx.body = fromContext(ctx)

    ctx.mqtt.publish('orders', asBuffer(ctx.body))

    await new Promise(resolve => {
      ctx.mqtt.on('message', (topic, buffer) => {
        const data = JSON.parse(buffer.toString())

        if (data.subject === ctx.body.subject) {
          if (data.status === 'created') {
            console.log(data)
            resolve(data)
          }
        }

      })
    })

    return next()
  }
}

module.exports = create
