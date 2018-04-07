const Bull = require('bull')

const broker = new Bull('orders')

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

broker.process('bitfinex', pathToWorker('bitfinex'))
