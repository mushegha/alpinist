const rt = require('rethinkdb')

const options = {
  host: 'localhost',
  port: 28015
}

module.exports.connect = () =>
  rt.connect(options)
