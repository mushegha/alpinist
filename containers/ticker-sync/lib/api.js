const Axios = require('axios')

const { map } = require('ramda')

const host = process.env.TICKER_HOST || 'localhost'
const port = process.env.TICKER_PORT || 8080

const baseURL = `http://${host}:${port}/`

const { put } = Axios.create({ baseURL })

const update = body => {
  const { provider, pair } = body

  return put(`${provider}/${pair}`, body)
}

module.exports.update = map(update)
