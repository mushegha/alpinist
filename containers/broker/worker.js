const debug = require('debug')('alp:broker')

const { Bull } = require('./lib/clients')



/**
 * Settings
 */

// const WORKERS = [
//   'bitfinex'
// ]

/**
 * Helpers
 */

const pathToWorker = name =>
  `${__dirname}/lib/brokers/${name}`

/**
 * Workers
 */
const broker = new Bull('orders')

debug('Add worker for %s', 'bitfinex')

broker.process('bitfinex', pathToWorker('bitfinex'))
