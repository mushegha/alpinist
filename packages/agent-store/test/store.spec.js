import test from 'ava'

import AgentStore from '..'

test('connect', async t => {
  await new AgentStore()
    .info()
    .then(res => {
      t.is(res.db_name, 'agents')
      t.is(res.host, 'http://localhost:5984/agents/')
    })

  await new AgentStore('agents-x')
    .info()
    .then(res => {
      t.is(res.db_name, 'agents-x', 'AgentStore(dbName)')
      t.is(res.host, 'http://localhost:5984/agents-x/')
    })

  await new AgentStore({ baseURL: null })
    .info()
    .then(res => {
      t.is(res.db_name, 'agents', 'AgentStore({ baseURL: null })')
      t.is(res.host, undefined, 'is local')
    })

  t.pass()
})

test.todo('plugins')
