const rt = require('rethinkdb')


const { parse, stringify } = JSON


const connectionOptions = {
  host: 'localhost',
  port: 28015
}


module.exports = async ws => {

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

  ws.on('close', () => ws.emit('unsubscribe'))

  ws.on('subscribe', async pred => {

    /**
     * Connect
     */

    const conn = await rt
      .connect(connectionOptions)

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

    ws.on('unsubscribe', () => {
      console.log('closing connection')
      conn.close()
    })
  })

  return ws
}
