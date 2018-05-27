import Vue from 'vue'

function PUT (state, ticker) {
  const { broker, symbol } = ticker

  const id = `${broker}-${symbol}`

  return ticker._deleted
    ? Vue.delete(state, id)
    : Vue.set(state, id, ticker)
}

export {
  PUT
}
