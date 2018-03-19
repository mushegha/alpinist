const Axios = require('axios')

const { map } = require('ramda')

const baseURL = 'http://localhost:8080/api/v1/ticker'

const { put } = Axios.create({ baseURL })

const update = body => {
  const { provider, pair } = body

  const uri = `${provider}/${pair}`

  return put(uri, body)
    .catch(console.log)
}

module.exports.update = map(update)
