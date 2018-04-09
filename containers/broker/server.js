const debug = require('debug')('alp:broker')

const queue = require('./lib/queue')

/**
 * Settings
 */

// const WORKERS = [
//   'bitfinex'
// ]

//
// broker.process('bitfinex', pathToWorker('bitfinex'))
//

queue.app.listen(4000)
