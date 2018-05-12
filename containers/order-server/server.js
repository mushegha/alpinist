const Koa = require('koa')

const mount = require('koa-mount')

const logger = require('koa-logger')

const Store = require('@alpinist/order-store')

const Router = require('@alpinist/order-router')

const app = new Koa()

const router = new Router()

const store = new Store()

app.context.store = store

app.use(logger())

app.use(mount(router))

app.listen(30080)
