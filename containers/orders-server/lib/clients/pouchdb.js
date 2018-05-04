const PouchDB = require('pouchdb')

const getenv = require('getenv')

const DEFAULT_OPTIONS = getenv.multi([
  host : ['COUCHDB_HOST', 'http://localhost'],
  port : ['COUCHDB_PORT', 5984, 'int']
])

const urlFor = (dbName, { host, port }) =>
  `${host}:${port}/${dbName}`


