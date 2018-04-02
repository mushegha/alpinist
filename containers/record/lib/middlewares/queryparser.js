const {
  unless,
  compose,
  reject,
  isNil,
  applySpec,
  cond,
  prop,
  equals,
  always,
  startsWith,
  replace
} = require('ramda')

/**
 *
 */

const trader = prop('trader')

const tickerClose = compose(
  cond([
    [ equals('open'), always({ $exists: false }) ],
    [ equals('closed'), always({ $exists: true }) ],
  ]),
  prop('status')
)

const sort = compose(
  field => {
    if (!field) return void 0

    const key = replace(/^\-/, '', field)
    const val = startsWith('-', field) ? -1 : 1

    return { [key]: val }
  },
  prop('sort')
)

const limit = compose(
  unless(isNil, Number),
  prop('limit')
)

/**
 *
 */

const parseQuery = compose(
  reject(isNil),
  applySpec({
    trader,
    tickerClose
  })
)

const parseOptions = compose(
  reject(isNil),
  applySpec({
    sort,
    limit
  })
)

module.exports = () => {
  return async function queryparser (ctx, next) {
    ctx.state.query = parseQuery(ctx.query)
    ctx.state.options = parseOptions(ctx.query)

    return next()
  }
}
