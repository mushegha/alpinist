const debug = require('debug')('ticker:rethinkdb')

const rt = require('rethinkdb')

const getenv = require('getenv')

const { tap } = require('ramda')

const options = getenv.multi({
  host: ['RETHINKDB_HOST', 'localhost'],
  port: ['RETHINKDB_PORT', 28015, 'int']
})

async function connect () {
  const logSuccess = _ => debug('Database connection estabilished')

  return rt
    .connect(options)
    .then(tap(logSuccess))
}

module.exports = {
  connect
}
