const OrderStore = require('./lib/order-store')

const store = new OrderStore()

store
  .source()
  .subscribe(console.log)
