const rt = require('rethinkdb')

const { curryN } = require('ramda')


const Table = rt
  .db('alpinist')
  .table('ticker')


async function insert (data, conn) {
  return Table
    .insert(data)
    .run(conn)
}


module.exports.insert = curryN(2, insert)
