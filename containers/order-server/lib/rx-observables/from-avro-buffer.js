const { Type } = require('avsc')

const { of } = require('rxjs/observable/of')

const { curry } = require('ramda')

function fromAvroBuffer (schema, buffer) {
  const type = Type.forSchema(schema)
  const payload = type.fromBuffer(buffer)

  return of(payload)
}

module.exports = curry(fromAvroBuffer)
