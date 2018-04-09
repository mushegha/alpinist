const queue = require('./lib/queue')

// Submit function in async fashion

async function submit (order) {
  const job = queue
    .create('bitfinex', order)
    .save()

  const listen = (resolve, reject) => {
    job
      .on('complete', resolve)
      .on('fail', reject)
  }

  return new Promise(listen)
}

// Perform

const order = {
  symbol: 'ethusd',
  amount: 0.01,
  type  : 'MARKET',
  side  : 'BUY'
}

submit(order)
  .then(console.log)
  .catch(console.error)
