const rt = require('rethinkdb')


const { parse, stringify } = JSON


const connectionOptions = {
  host: process.env.RETHINKDB_HOST || 'localhost',
  port: process.env.RETHINKDB_PORT || 28015
}


module.exports = async ws => {

  const conn = await rt.connect(connectionOptions)

  /**
   * Delegate
   */

  ws.on('message', msg => {
    try {
      const { type, payload } = parse(msg)
      ws.emit(type, payload)
    } catch (err) {
      console.error(err)
      ws.emit('error', err)
    }
  })

  ws.on('close', () => {
    ws.emit('unsubscribe')
    conn.close()
  })

  ws.on('publish', async data => {
    data.timestamp = rt.now()

    rt.db('alpinist')
      .table('ticker')
      .insert(data)
      .run(conn)
  })

  ws.on('subscribe', async pred => {
    // drop previous subscription
    // ws.emit('unsubscribe')

    const cursor = await rt
      .db('alpinist')
      .table('ticker')
      .orderBy({ index: rt.desc('timestamp') })
      .filter(pred)
      .limit(1)
      .changes()
      .run(conn)

    cursor.each((err, row) => {
      if (err) return void 0

      const val = stringify(row.new_val)
      ws.send(val)
    })

    ws.once('unsubscribe', () => {
      console.log('closing cursor')
      cursor.close()
    })
  })

  return ws
}
