import test from 'ava'

import PouchDB from 'pouchdb'

import connectPlugin from '..'

const SEED = require('./seed.json')

PouchDB.plugin(connectPlugin)

let db = new PouchDB('db-' + Date.now())

test.after.always(_ => db.destroy())

test.serial.cb('live', t => {
  db.source()
    .take(2)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )

  SEED.forEach(x => db.put(x))

  t.pass()
})

test.serial.cb('history', t => {
  db.source({
      since: 0,
      live: false
    })
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )

  t.pass()
})

test.serial.cb('history + live', t => {
  db.source({ since: 0 })
    .take(3)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )

  db.put({
    _id: 'c',
    body: 'z'
  })

  t.pass()
})
