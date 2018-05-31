import Vue from 'vue'

function PUT (state, order) {
  const id = order.id

  return order._deleted
    ? Vue.delete(state, id)
    : Vue.set(state, id, order)
}

export {
  PUT
}
