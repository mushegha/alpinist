const create = require('./lib')

const app = create()

app.listen(process.NODE_PORT || 3000)
