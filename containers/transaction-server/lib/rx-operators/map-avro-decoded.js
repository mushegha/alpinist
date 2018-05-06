const { map } = require('rxjs/operators')

const { Type } = require('avsc')

function decode (schema) {
  const type = Type.forSchema(schema)
  return payload => type.fromBuffer(payload)
}

module.exports = schema => map(decode(schema))
