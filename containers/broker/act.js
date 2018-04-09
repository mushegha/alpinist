const queue = require('./lib/queue')

const doc = {
  symbol: 'ethusd',
  amount: 0.02,
  side  : 'BUY'
}

const job = queue
  .create('bitfinex', doc)
  .save(err => {
    if (err) {
      console.log(err.message)
    }

    console.log(job.id)
  })

job.on('complete', function(result){
  console.log('Job completed with data ', result)

}).on('failed attempt', function(errorMessage, doneAttempts){
  console.log('Job failed', errorMessage, doneAttempts)

}).on('failed', function(errorMessage){
  console.log('Job failed', errorMessage)

}).on('progress', function(progress, data){
  console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data )

})
