const rt = require('rethinkdb')

const options = {
  host: process.env.RETHINKDB_HOST || 'localhost',
  port: process.env.RETHINKDB_PORT || 28015
}

async function connect () {
  return rt.connect(options)
}

module.exports = {
  connect
}
