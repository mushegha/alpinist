const rt = require('rethinkdb')

const getenv = require('getenv')

const options = getenv.multi({
  host: ['RETHINKDB_HOST', 'localhost'],
  port: ['RETHINKDB_PORT', 28015, 'int']
})

async function connect () {
  return rt.connect(options)
}

module.exports = {
  connect
}
