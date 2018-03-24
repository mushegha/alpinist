const mongo = require('../clients/mongo')

const { max, subSeconds } = require('date-fns')

const find = (query = {}) => {
  const SINCE = subSeconds(new Date(), 150)
  const since = query.since
    ? new Date(query.since)
    : SINCE

  const dateCreated = {
    $gte: max(since, SINCE)
  }

  return mongo
    .get('ticker')
    .find({ dateCreated })
}

module.exports = () => {
  return async ctx => {
    ctx.body = await find(ctx.query)
  }
}
