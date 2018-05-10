const Koa = require('koa')

const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const Queue = require('@alpinist/order-queue')

const routes = require('./lib/koa-routes')

const app = new Koa()

app.context.queue = new Queue()

app.use(logger())
app.use(bodyParser())

app.use(routes())

app.listen(30080)
