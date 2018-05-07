const { Type } = require('avsc')

const { of } = require('rxjs/observable/of')

const { curry } = require('ramda')

function toAvroBuffer (schema, payload) {
  const type = Type.forSchema(schema)
  const buffer = type.toBuffer(payload)

  return of(buffer)
}

module.exports = curry(toAvroBuffer)
