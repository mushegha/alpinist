# Broker

Broker system on top of [Kue][kue-repo] job queue to manage orders on different exchange
markets using common API.

[kue-repo]: https://github.com/Automattic/kue

## Flow

High-level diagram of interconnected parts.

![diagram](assets/hl-diagram.png)

## Usage

```js
const kue = require('kue')

const broker = kue.createQueue('broker')

// Submit function in async fashion

async function submit (order) {
  const job = broker
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
  amount: 0.2,
  type  : 'MARKET',
  side  : 'BUY'
}

submit(order)
  .then(console.log)
  .catch(console.error)



```

## Order Schema

New order

```json
{ 
  "symbol" : "ethusd",
  "amount" : 0.02,
  "side"   : "BUY" 
}
```

Closed order

```json
{ 
  "id"     : 10492348851,
  "ts"     : 1523274798600,
  "symbol" : "ethusd",
  "amount" : 0.02,
  "price"  : 394.9,
  "side"   : "BUY" 
}
```
