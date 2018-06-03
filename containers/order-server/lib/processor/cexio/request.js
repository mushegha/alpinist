const Axios = require('axios')

const signedWith = require('./signed-with')

const request = Axios.create({
  baseURL: 'https://cex.io/api'
})

function Client (creds) {
  const signed = signedWith(creds)

  return (uri, params) =>
    request
      .post(uri, signed(params))
      .then(res => res.data)
}

module.exports = Client

