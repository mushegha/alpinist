const debug = require('debug')('alp:accord:client:monk')

const monk = require('monk')

const getenv = require('getenv')

/**
 * Default settings
 */

const HOST = getenv('MONGODB_HOST', 'localhost')
const PORT = getenv.int('MONGODB_PORT', 27017)
const PATH = getenv('MONGODB_PATH', 'alpinist')

const DEFAULT_URI = `mongodb://${HOST}:${PORT}/${PATH}`

function create (uri) {
  debug('Creating..')
  return monk(uri || DEFAULT_URI)
}

module.exports = create
