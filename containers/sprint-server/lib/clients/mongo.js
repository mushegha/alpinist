const Monk = require('monk')

const getenv = require('getenv')

/**
 * Connection string
 */

const host = getenv('MONGODB_HOST', 'localhost')
const port = getenv.int('MONGODB_HOST', 6379)
const path = getenv('MONGODB_PATH', 'test')

const uri = `mongodb://${host}:${port}/${path}`

module.exports = new Monk(uri)
