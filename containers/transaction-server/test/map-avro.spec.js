import test from 'ava'

import { of } from 'rxjs/observable/of'

import avro from 'avsc'

import mapAvroEncoded from '../lib/rx-operators/map-avro-encoded'
import mapAvroDecoded from '../lib/rx-operators/map-avro-decoded'

const schema = {
  type: 'record',
  fields: [
    {
      name: 'subject',
      type: 'string'
    }
  ]
}

const type = avro.Type.forSchema(schema)

test.cb('encode', t => {
  const payload = {
    subject: 'a'
  }

  const source = of(payload)
    .pipe(mapAvroEncoded(schema))

  const assertResult = buf => {
    const { subject } = type.fromBuffer(buf)
    t.is(subject, 'a')
  }

  const subscriber = source.subscribe(
    assertResult,
    console.error,
    _ => t.end()
  )
})

test.cb('decode', t => {
  const payload = {
    subject: 'a'
  }

  const source = of(type.toBuffer(payload))
    .pipe(mapAvroDecoded(schema))

  const assertResult = ({ subject }) => {
    t.is(subject, 'a')
  }

  const subscriber = source.subscribe(
    assertResult,
    console.error,
    _ => t.end()
  )
})
