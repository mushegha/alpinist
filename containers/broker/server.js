const debug = require('debug')('alp:broker')

const getenv = require('getenv')

const queue = require('./lib')

const PORT = getenv.int('NODE_PORT', 8080)

debug('Server listening to port %d', PORT)

queue.app.listen(PORT)
