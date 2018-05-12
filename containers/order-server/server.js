const Koa = require('koa')

const mount = require('koa-mount')

const logger = require('koa-logger')

const Store = require('@alpinist/order-store')

const Queue = require('@alpinist/order-queue')

const Router = require('@alpinist/order-router')

/**
 *
 */

const router = new Router()

const store = new Store()

/**
 *
 */

const app = new Koa()

app.context.store = store

app.use(logger())

app.use(mount(router))

app.listen(30080)

/**
 *
 */

store
  .source()
  .subscribe(Queue.Sink())

Queue
  .Source()
  .subscribe(store.sink())

