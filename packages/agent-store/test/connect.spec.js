import test from 'ava'

import { Observable } from 'rxjs/Rx'

import Store from '..'

import {
  tap
} from 'ramda'

const AGENTS = require('./seed.json')

test.before(_ => Store().destroy())

test.beforeEach(t => {
  t.context.store = new Store()
})

test.serial.cb('live', t => {
  const { store } = t.context

  store
    .source()
    .take(3)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )

  AGENTS.forEach(x => store.putAgent(x))

  store.putAgent({
    id: 'a2',
    isActive: false
  })

  t.pass()
})

test.serial.cb('history', t => {
  const { store } = t.context

  store
    .source({
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
  const { store } = t.context

  store
    .source({ since: 0 })
    .take(3)
    .subscribe(
      console.log,
      console.error,
      _ => t.end()
    )

  store.putAgent({
    id: 'a2',
    isActive: false
  })

  t.pass()
})
