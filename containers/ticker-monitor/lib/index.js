const rt = require('rethinkdb')
const { Observable } = require('rxjs')
const { prop } = require('ramda')

const connectionOptions = {
  host: 'localhost',
  port: 28015
}

const descTimestamp = {
  index: rt.desc('timestamp')
}

const getCursor = (conn, pred) =>
  rt.db('alpinist')
    .table('ticker')
    .orderBy(descTimestamp)
    .filter(pred)
    .limit(1)
    .changes()
    .run(conn)

function tickerStream (pred) {
  async function fromCursor (observer) {
    const conn = await rt.connect(connectionOptions)
    const cursor = await getCursor(conn, pred)

    cursor.each((err, row) => {
      observer.next(row)
    })

    return () => cursor.close()
  }

  return Observable.create(fromCursor)
}

const pred = {
  pair: 'btcusd',
  provider: 'bitfinex'
}

const subscribtion = tickerStream(pred)
  .map(prop('new_val'))
  .subscribe(console.log)

setTimeout(() => {
  console.log('exiting')
  subscribtion.unsubscribe()
}, 10000)
