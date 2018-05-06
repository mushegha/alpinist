const { map } = require('rxjs/operators')

const { Type } = require('avsc')

function encode (schema) {
  const type = Type.forSchema(schema)
  return payload => type.toBuffer(payload)
}

module.exports = schema => map(encode(schema))
