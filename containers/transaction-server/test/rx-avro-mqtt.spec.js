import test from 'ava'

import {
  fromAvroBuffer,
  toAvroBuffer
} from '../lib/rx-observables'

const schema = {
  type: 'record',
  fields: [
    {
      name: 'subject',
      type: 'string'
    }
  ]
}

test('avro - avro', async t => {
  const payload = { subject: 'a' }

  await toAvroBuffer(schema, payload)
    .flatMap(fromAvroBuffer(schema))
    .toPromise()
    .then(res => {
      t.is(res.subject, 'a')
    })
})
