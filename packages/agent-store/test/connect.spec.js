import test from 'ava'

import { Observable } from 'rxjs/Rx'

import Store from '..'

import {
  tap
} from 'ramda'

const AGENTS = require('./seed.json')

test.beforeEach(_ => Store().destroy())

test.serial('source', async t => {
  let log = []

  const store = new Store()

  const p = store
    .source()
    .map(x => log.push(x))
    .take(AGENTS.length)
    .toPromise()

  for (let i in AGENTS) {
    await store.putAgent(AGENTS[i])
  }

  await p

  t.is(log.length, 2)
})
