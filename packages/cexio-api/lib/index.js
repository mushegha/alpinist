const submitOrder = require('./submit-order')

function Client (creds) {
  return {
    submitOrder: submitOrder(creds)
  }
}

module.exports = Client
