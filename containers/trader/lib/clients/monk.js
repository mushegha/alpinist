const debug = require('debug')('alp:trader:client:monk')

const monk = require('monk')

const getenv = require('getenv')

/**
 * Default settings
 */

const HOST = getenv('MONGODB_HOST', 'localhost')
const PORT = getenv.int('MONGODB_HOST', 27017)
const PATH = getenv('MONGODB_PATH', 'alpinist')

const DEFAULT_URI = `mongodb://${HOST}:${PORT}/${PATH}`

function create (uri = DEFAULT_URI) {
  debug('Creating..')

  return monk(uri)
}

module.exports = create
