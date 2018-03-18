const debug = require('debug')('queue')

const Bull = require('bull')

const DIR = __dirname + '/lib/'

const feeder = new Bull('feeder')

feeder.process(DIR + 'btcusd-bitfinex.js')

feeder
  .on('error', function(error) {
    debug('error: %O', error)
  })

  .on('active', function(job, jobPromise){
    debug('active: %s %O', job.id, job.data)
  })

  .on('stalled', function(job){
    debug('stalled: %s', job.id)
  })

  .on('progress', function(job, progress){
    debug('progress: %s %d', job.id, progress)
  })

  .on('completed', function(job, result){
    debug('completed: %s %O', job.id, result)
  })

  .on('failed', function(job, err){
    debug('failed: %s %O', job.id, err)
  })

  .on('paused', function(){
    // The queue has been paused.
  })

  .on('resumed', function(job){
    // The queue has been resumed.
  })

  .on('cleaned', function(jobs, type) {
    // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
    // jobs, and `type` is the type of jobs cleaned.
  })

feeder.add({ pair: 'btcusd', provider: 'bitfinex' })
