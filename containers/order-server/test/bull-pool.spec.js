import test from 'ava'

import { Bull } from '../clients'

test('init', async t => {
  const client = await Bull.acquire()

  await Bull.release(client)

  t.pass()
})
