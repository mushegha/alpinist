const createApp = require('./lib')

const app = createApp()

const port = process.env.NODE_PORT || 8080

app.listen(port)
