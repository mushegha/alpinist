const debug = require('debug')('server')

const getenv = require('getenv')

const createApp = require('./lib')

const app = createApp()

const port = getenv.int('NODE_PORT', 8080)

app.listen(port, () => {
  debug('Listening to %d', port)
})
