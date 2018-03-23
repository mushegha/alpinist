const debug = require('debug')('alpinist:worker')


const noop = () => {}

debug('Started')

setTimeout(noop, 5000)
