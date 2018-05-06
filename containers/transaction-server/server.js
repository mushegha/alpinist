const Koa = require('koa')

const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const routes = require('./lib/routes')

const app = new Koa()

app.use(logger())
app.use(bodyParser())

app.use(routes())

app.listen(30080)
