const crypto = require('crypto')

const {
  merge,
  curry
} = require('ramda')

let incr = Date.now()

const noncer = () => String(++incr)

const hmacOf = (secret, data) => {
  const buf = new Buffer(secret)

  const hmac = crypto.createHmac('sha256', buf)

  hmac.update(data)

  return hmac
    .digest('hex')
    .toUpperCase()
}

function signedWith (creds, obj) {
  const { userId, apiKey, apiSecret } = creds

  const nonce = noncer()

  const msg = nonce + userId + apiKey

  const params = {
    nonce,
    key: apiKey,
    signature : hmacOf(apiSecret, msg)
  }

  return merge(obj, params)
}

module.exports = curry(signedWith)
