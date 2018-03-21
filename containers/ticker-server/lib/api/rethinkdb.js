const rt = require('rethinkdb')

const {
  assoc,
  curryN,
  is,
  map,
  pick
} = require('ramda')

/**
 * Helpers
 */

const withTime = data => {
  const setTime = assoc('time', new Date())

  return is(Array, data)
    ? map(setTime, data)
    : setTime(data)
}


const Table = rt
  .db('alpinist')
  .table('ticker')


async function insert (data, conn) {
  return Table
    .insert(withTime(data))
    .run(conn)
}

async function select (pred, conn) {
  const { limit = 10 } = pred

  const filter = pick(['origin', 'symbol'], pred)

  const descTime = { index: rt.desc('time') }

  const query = Table
    .orderBy(descTime)
    .filter(filter)
    .limit(limit)

  const cursor = await query.run(conn)

  return cursor.toArray()
}


module.exports.insert = curryN(2, insert)

module.exports.select = curryN(2, select)
