const rt = require('rethinkdb')

const {
  curryN,
  pick
} = require('ramda')


const Table = rt
  .db('alpinist')
  .table('ticker')


async function insert (data, conn) {
  return Table
    .insert(data)
    .run(conn)
}

async function select (pred, conn) {
  const { limit = 10 } = pred

  const filter = pick(['origin', 'symbol'], pred)

  const query = Table
    .orderBy({ index: rt.desc('moment') })
    .filter(filter)
    .limit(limit)

  const cursor = await query.run(conn)

  return cursor.toArray()
}


module.exports.insert = curryN(2, insert)

module.exports.select = curryN(2, select)
